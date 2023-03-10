import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CloseRound,
  CollectVaultFee,
  CreateToken,
  Cruize,
  Deposit,
  InitiateStandardWithdrawal,
  InstantWithdrawal,
  StandardWithdrawal,
} from "../generated/Cruize/Cruize";
import { Asset, DepositReceipt, Round, Token, Transaction, User, WithdrawReceipt } from "../generated/schema";
import {
  ARBITRUM_GOERLI,
  ETH_ADDRESS,
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchVault,
  loadAsset,
  ONE_BI,
  ZERO_BI,
} from "./helpers";


 // event (token, crToken , tokenName, tokenSymbol , decimal ,tokenCap)
export function handleCreateToken(event: CreateToken): void {
  let asset = new Asset(event.params.token.toHexString());

  let underlyingToken = new Token(event.params.token.toHexString());

  if(event.params.token.toHexString() == ETH_ADDRESS){
    underlyingToken.name = "ETH";
    underlyingToken.symbol = "ETH";
    underlyingToken.decimals = BigInt.fromI64(18);
  } else {
    underlyingToken.name = fetchTokenName(event.params.token);
    underlyingToken.symbol = fetchTokenSymbol(event.params.token);
    underlyingToken.decimals = fetchTokenDecimals(event.params.token);
  }


  let crToken = new Token(event.params.crToken.toHexString());
  crToken.name = event.params.tokenName;
  crToken.symbol = event.params.tokenSymbol;
  crToken.decimals = BigInt.fromU64(event.params.decimal);

  underlyingToken.save();
  crToken.save();

  asset.reserve = underlyingToken.id;
  asset.crToken = crToken.id;
  asset.save();

  let round = new Round(`${BigInt.fromU64(1).toString()}-${event.params.token.toHexString()}`);
  round.token = underlyingToken.id;
  round.fee = ONE_BI;
  round.round = ONE_BI;
  round.cap = event.params.tokenCap;
  round.SharePerUnit = ONE_BI;
  round.lockedAmount = ZERO_BI;
  round.save()
}

// event (account ,amount , token )
export function handleDepositEvent(event: Deposit): void {
  let user = User.load(event.transaction.from.toHexString());
  if (!user) {
    user = new User(event.transaction.from.toHexString());
    user.totalDeposits = ZERO_BI;
    user.totalWithdraws = ZERO_BI;
    user.lastDeposit = null
    user.lastWithdraw = null
    user.transactions = [];
  }

  // fetch token vault
  let vault = fetchVault(event.params.token);

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
  if(user.lastWithdraw){
    let withdrawReceipt = WithdrawReceipt.load(user.lastWithdraw)
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

  let currentRound = Round.load(`${event.params.round.toString()}-${event.params.token.toHexString()}`);
  if(currentRound){
    currentRound.SharePerUnit = event.params.SharePerUnit;
    currentRound.save();
  }

    let nextRound = new Round(`${(event.params.round+1).toString()}-${event.params.token.toHexString()}`);
    nextRound.round = BigInt.fromU64(event.params.round+1);
    nextRound.cap = vault.cap;
    nextRound.fee = ZERO_BI;
    nextRound.token = event.params.token.toHexString()
    nextRound.SharePerUnit = ZERO_BI;
    nextRound.lockedAmount = event.params.lockedAmount;
    nextRound.save();

}

// event (token , fee)
export function handleFeeCollection(event: CollectVaultFee ):void {
  const vault = fetchVault(event.params.token);
  let currentRound = Round.load(`${vault.round.minus(BigInt.fromU64(1))}-${event.params.token.toHexString()}`);
  if(currentRound){
    currentRound.fee = event.params.round;
    currentRound.save();
  }
}