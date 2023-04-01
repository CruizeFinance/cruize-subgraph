import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CloseRound,
  CollectVaultFee,
  CreateToken,
  Deposit,
  InitiateStandardWithdrawal,
  InstantWithdrawal,
  StandardWithdrawal,
} from "../generated/Cruize/Cruize";
import { Asset, DepositReceipt, ProtocolInfo, Round, Token, TokenInfo, Transaction, User, WithdrawReceipt } from "../generated/schema";
import {
  ETH_ADDRESS,
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchVault,
  getPrice,
  loadAsset,
  ONE_BI,
  toPower,
  ZERO_BI,
} from "./helpers";

 // event (token, crToken , tokenName, tokenSymbol , decimal ,tokenCap)
export function handleCreateToken(event: CreateToken): void {
  let asset = new Asset(event.params.token.toHexString());

  let underlyingToken = new Token(event.params.token.toHexString());

  underlyingToken.type = "BASE";
  if(event.params.token.toHexString() == ETH_ADDRESS){
    underlyingToken.name = "ETH";
    underlyingToken.symbol = "ETH";
    underlyingToken.decimals = BigInt.fromI64(18);
  } else {
    underlyingToken.name = fetchTokenName(event.params.token);
    underlyingToken.symbol = fetchTokenSymbol(event.params.token);
    underlyingToken.decimals = fetchTokenDecimals(event.params.token);
  }

  let tokenInfo = new TokenInfo(event.params.token.toHexString());
  tokenInfo.amountInAsset = ZERO_BI;
  tokenInfo.amountInUSD = ZERO_BI;
  tokenInfo.totalDeposits = ZERO_BI;
  tokenInfo.totalWithdrawals = ZERO_BI;
  tokenInfo.closedRounds = ZERO_BI;
  tokenInfo.save();

  underlyingToken.info = tokenInfo.id;


  let crToken = new Token(event.params.crToken.toHexString());
  crToken.name = event.params.tokenName;
  crToken.symbol = event.params.tokenSymbol;
  crToken.type = "LP";
  crToken.decimals = BigInt.fromU64(event.params.decimal);

  underlyingToken.save();
  crToken.save();

  asset.reserve = underlyingToken.id;
  asset.crToken = crToken.id;
  asset.save();

  let round = new Round(BigInt.fromU64(1).toString().concat("-").concat(event.params.token.toHexString()));
  round.token = underlyingToken.id;
  round.fee = ZERO_BI;
  round.round = ONE_BI;
  round.pending = ZERO_BI;
  round.cap = event.params.tokenCap;
  round.SharePerUnit = ONE_BI;
  round.lockedAmount = ZERO_BI;
  round.status = "OPEN";
  round.save()

  // populate Protocol Info 
  let to = event.transaction.to;
  if(to){
    let protocolInfo = ProtocolInfo.load(to.toHexString());
    if(!protocolInfo)
      protocolInfo = new ProtocolInfo(to.toHexString());
    protocolInfo.totalUsers = ZERO_BI;
    protocolInfo.totalDeposits = ZERO_BI;
    protocolInfo.totalWithdrawal = ZERO_BI;
    protocolInfo.closedRounds = ZERO_BI;
    protocolInfo.save();
  }
}

// event (account ,amount , token )
export function handleDepositEvent(event: Deposit): void {
  
  let newUser = false;
  let user = User.load(event.transaction.from.toHexString());
  if (!user) {
    user = new User(event.transaction.from.toHexString());
    user.totalDeposits = ZERO_BI;
    user.totalWithdraws = ZERO_BI;
    user.lastDeposit = null
    user.lastWithdraw = null
    user.transactions = [];
    newUser = true;
  }
  // fetch token vault
  let vault = fetchVault(event.params.token);

  // update TokenInfo
  let tokenInfo = TokenInfo.load(event.params.token.toHexString())
  if(tokenInfo){
    const decimals = fetchTokenDecimals(event.params.token)
    tokenInfo.totalDeposits = tokenInfo.totalDeposits.plus(ONE_BI);
    tokenInfo.amountInAsset = vault.lockedAmount.plus(vault.pending);
    tokenInfo.amountInUSD = tokenInfo.amountInAsset.times(getPrice(event.params.token.toHexString().toLowerCase())).div(toPower(decimals));
    tokenInfo.save();
  }

  // update ProtocolInfo
  let to = event.transaction.to;
  if(to){
    let protocolInfo = ProtocolInfo.load(to.toHexString());
    if(protocolInfo){
      protocolInfo.totalDeposits = protocolInfo.totalDeposits.plus(ONE_BI);
      protocolInfo.totalUsers = newUser ? protocolInfo.totalUsers.plus(ONE_BI) : protocolInfo.totalUsers;
      protocolInfo.save()
    }
  }


  // update Round
  let currentRound = Round.load(vault.round.toString().concat("-").concat(event.params.token.toHexString()));
  if(currentRound){
    currentRound.pending = currentRound.pending.plus(event.params.amount);
    currentRound.save();
  }

  // populate deposit receipt
  let depositReceipt = new DepositReceipt(event.transaction.hash.toHexString())
  depositReceipt.round = vault.round;
  depositReceipt.amount = event.params.amount;
  depositReceipt.save();
  
  user.totalDeposits = user.totalDeposits.plus(event.params.amount);
  user.lastDeposit = depositReceipt.id;

  // populate deposit
  let transaction = new Transaction(event.transaction.hash.toHexString());
  
  let asset = Asset.load(event.params.token.toHexString());
  if(!asset) asset = loadAsset(event.params.token);
  transaction.account = event.transaction.from;
  transaction.asset = asset.id;
  transaction.round = vault.round;
  transaction.type = "DEPOSIT";
  transaction.status = "SUCCESS"
  transaction.decimals = fetchTokenDecimals(event.params.token);
  transaction.amount = event.params.amount;
  transaction.txHash = event.transaction.hash;
  transaction.timestamp = event.block.timestamp;
  
  transaction.save();

  let transactions = user.transactions;
  transactions.push(transaction.id);
  user.transactions = transactions;
  user.save();
}

// event (account , amount ,currentRound , token )
export function handleInstantWithdrawEvent(event: InstantWithdrawal): void {
  let user = User.load(event.transaction.from.toHexString());
  if (!user) user = new User(event.transaction.from.toHexString());
  user.totalWithdraws = user.totalWithdraws.plus(event.params.amount);
  
  // fetch token vault
  let vault = fetchVault(event.params.token);

  // update TokenInfo
  let tokenInfo = TokenInfo.load(event.params.token.toHexString())
  if(tokenInfo){
    const decimals = fetchTokenDecimals(event.params.token);
    tokenInfo.totalWithdrawals = tokenInfo.totalWithdrawals.plus(ONE_BI);
    tokenInfo.amountInAsset = vault.lockedAmount.plus(vault.pending);
    tokenInfo.amountInUSD = tokenInfo.amountInAsset.times(getPrice(event.params.token.toHexString())).div(toPower(decimals));
    tokenInfo.save();
  }

  // update ProtocolInfo
  let to = event.transaction.to;
  if(to){
    let protocolInfo = ProtocolInfo.load(to.toHexString());
    if(protocolInfo){
      protocolInfo.totalWithdrawal = protocolInfo.totalWithdrawal.plus(ONE_BI);
      protocolInfo.save()
    }
  }

  // update Round
  let currentRound = Round.load(event.params.currentRound.toString().concat("-").concat(event.params.token.toHexString()));
  if(currentRound){
    currentRound.pending = currentRound.pending.minus(event.params.amount);
    currentRound.save();
  }


  // populate withdraw
  let transaction = new Transaction(event.transaction.hash.toHexString());

  let asset = Asset.load(event.params.token.toHexString());
  if(!asset) asset = loadAsset(event.params.token);

  transaction.account = event.transaction.from;
  transaction.round = BigInt.fromU64(event.params.currentRound);
  transaction.type = "INSTANT-WITHDRAW";
  transaction.status = "SUCCESS";
  transaction.asset = asset.id;
  transaction.decimals = fetchTokenDecimals(event.params.token);
  transaction.amount = event.params.amount;
  transaction.txHash = event.transaction.hash;
  transaction.timestamp = event.block.timestamp;

  transaction.save();

  let transactions = user.transactions;
  transactions.push(transaction.id);
  user.transactions = transactions;
  user.save();
}

// event ( account , token , shares )
export function handleInitiateWithdrawEvent(event: InitiateStandardWithdrawal ):void {
  let user = User.load(event.transaction.from.toHexString());
  if (!user) user = new User(event.transaction.from.toHexString());
  
  // fetch token vault
  let vault = fetchVault(event.params.token);

  // populate withdraw receipt
  let withdrawReceipt = new WithdrawReceipt(event.transaction.hash.toHexString())
  withdrawReceipt.round = vault.round;
  withdrawReceipt.account = event.transaction.from;
  withdrawReceipt.shares = event.params.amount;
  withdrawReceipt.isRequested = true;
  withdrawReceipt.amount = ZERO_BI;
  withdrawReceipt.save();
  
  user.lastWithdraw = withdrawReceipt.id;

  // populate withdraw
  let transaction = new Transaction(event.transaction.hash.toHexString());

  let asset = Asset.load(event.params.token.toHexString());
  if(!asset) asset = loadAsset(event.params.token);

  transaction.account = event.transaction.from;
  transaction.round = vault.round;
  transaction.type = "INITIATE-WITHDRAW";
  transaction.status = "SUCCESS";
  transaction.asset = asset.id;
  transaction.decimals = fetchTokenDecimals(event.params.token);
  transaction.amount = event.params.amount;
  transaction.txHash = event.transaction.hash;
  transaction.timestamp = event.block.timestamp;

  transaction.save();

  let transactions = user.transactions;
  transactions.push(transaction.id);
  user.transactions = transactions;
  user.save();
}

// event ( account , amount , token )
export function handleStandardWithdrawalEvent(event: StandardWithdrawal ):void {
  let user = User.load(event.transaction.from.toHexString());
  if(user){
  // fetch token vault
  let vault = fetchVault(event.params.token);

  // update TokenInfo
  let tokenInfo = TokenInfo.load(event.params.token.toHexString())
  if(tokenInfo){
    const decimals = fetchTokenDecimals(event.params.token)
    tokenInfo.totalWithdrawals = tokenInfo.totalWithdrawals.plus(ONE_BI);
    tokenInfo.amountInAsset = vault.lockedAmount.plus(vault.pending);
    tokenInfo.amountInUSD = tokenInfo.amountInAsset.times(getPrice(event.params.token.toHexString().toLowerCase())).div(toPower(decimals));
    tokenInfo.save();
  }

   // update ProtocolInfo
   let to = event.transaction.to;
   if(to){
     let protocolInfo = ProtocolInfo.load(to.toHexString());
     if(protocolInfo){
       protocolInfo.totalWithdrawal = protocolInfo.totalWithdrawal.plus(ONE_BI);
       protocolInfo.save()
     }
   }
  
  // populate withdraw
  let transaction = new Transaction(event.transaction.hash.toHexString());
  
  let asset = Asset.load(event.params.token.toHexString());
  if(!asset) asset = loadAsset(event.params.token);
  
  transaction.account = event.transaction.from;
  transaction.round = vault.round;
  transaction.type = "COMPLETE-WITHDRAW";
  transaction.status = "SUCCESS";
  transaction.asset = asset.id;
  transaction.decimals = fetchTokenDecimals(event.params.token);
  transaction.amount = event.params.amount;
  transaction.txHash = event.transaction.hash;
  transaction.timestamp = event.block.timestamp;
  
  transaction.save();
  
  let transactions = user.transactions;
  transactions.push(transaction.id);
  user.transactions = transactions;
  user.save();
  
  // populate withdraw receipt
  let _lastWithdraw = user.lastWithdraw;
  if(_lastWithdraw){
    let withdrawReceipt = WithdrawReceipt.load(_lastWithdraw)
    if(withdrawReceipt){
      withdrawReceipt.isRequested = false;
      withdrawReceipt.amount = event.params.amount;
      withdrawReceipt.save();
    }
  }
  
}

}

// event (token , round, sharePerUnit, lockedAmount)
export function handleCloseRound(event: CloseRound ):void {
  const vault = fetchVault(event.params.token);


  // update ProtocolInfo
  let to = event.transaction.to;
  if(to){
    let protocolInfo = ProtocolInfo.load(to.toHexString());
    if(protocolInfo){
      protocolInfo.closedRounds = protocolInfo.closedRounds.plus(ONE_BI);
      protocolInfo.save()
    }
  }

  // update TokenInfo
  let tokenInfo = TokenInfo.load(event.params.token.toHexString())
  if(tokenInfo){
    const decimals = fetchTokenDecimals(event.params.token)
    tokenInfo.closedRounds = tokenInfo.closedRounds.plus(ONE_BI);
    tokenInfo.amountInAsset = vault.lockedAmount.plus(vault.pending);
    tokenInfo.amountInUSD = tokenInfo.amountInAsset.times(getPrice(event.params.token.toHexString())).div(toPower(decimals));
    tokenInfo.save();
  }

  let currentRound = Round.load(event.params.round.toString().concat("-").concat(event.params.token.toHexString()));
  if(currentRound){
    currentRound.SharePerUnit = event.params.SharePerUnit;
    currentRound.status = "CLOSED";
    currentRound.save();
  }

    let nextRound = new Round((event.params.round+1).toString().concat("-").concat(event.params.token.toHexString()));
    nextRound.round = BigInt.fromU64(event.params.round+1);
    nextRound.cap = vault.cap;
    nextRound.pending = ZERO_BI;
    nextRound.fee = ZERO_BI;
    nextRound.status = "OPEN";
    nextRound.token = event.params.token.toHexString()
    nextRound.SharePerUnit = ZERO_BI;
    nextRound.lockedAmount = event.params.lockedAmount;
    nextRound.save();

}

// event (token , fee)
export function handleFeeCollection(event: CollectVaultFee ):void {
  const vault = fetchVault(event.params.token);
  let currentRound = Round.load(vault.round.minus(ONE_BI).toString().concat("-").concat(event.params.token.toHexString()));
  if(currentRound){
    currentRound.fee = event.params.vaultFee;
    currentRound.save();
  }
}
