import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CreateToken,
  Cruize,
  Deposit,
  InstantWithdrawal,
} from "../generated/Cruize/Cruize";
import { Asset, Token, Transaction, User } from "../generated/schema";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
} from "./helpers";

const ARBITRUM_GOERLI = "0xc904C95D0cbf50342FD92C8ab4764819F5641808"

 // event (token, crToken , name, symbol , decimal)
export function handleCreateToken(event: CreateToken): void {
  let asset = new Asset(event.params.tokenAddress.toHexString());

  let underlyingToken = new Token(event.params.tokenAddress.toHexString());
  underlyingToken.name = fetchTokenName(event.params.tokenAddress);
  underlyingToken.symbol = fetchTokenSymbol(event.params.tokenAddress);
  underlyingToken.decimals = fetchTokenDecimals(event.params.tokenAddress);

  let crToken = new Token(event.params.crTokenAddress.toHexString());
  crToken.name = event.params.tokenName;
  crToken.symbol = event.params.tokenSymbol;
  crToken.decimals = BigInt.fromU64(event.params.decimal);

  underlyingToken.save();
  crToken.save();

  asset.reserve = underlyingToken.id;
  asset.crToken = crToken.id;
  asset.save();
}

function loadAsset(token:Address) :Asset{
  let cruize:Cruize = Cruize.bind(Address.fromString(ARBITRUM_GOERLI));
  let cruizeToken = cruize.cruizeTokens(token);

  let underlyingToken = new Token(token.toHexString());
  underlyingToken.name = fetchTokenName(token);
  underlyingToken.symbol = fetchTokenSymbol(token);
  underlyingToken.decimals = fetchTokenDecimals(token);

  let crToken = new Token(token.toHexString());
  crToken.name = fetchTokenName(cruizeToken);
  crToken.symbol = fetchTokenSymbol(cruizeToken);
  crToken.decimals = fetchTokenDecimals(cruizeToken);

  underlyingToken.save();
  crToken.save();

  let asset = new Asset(token.toHexString())
  asset.reserve = underlyingToken.id;
  asset.crToken = crToken.id;
  asset.save()
  return asset;
}
// event (account ,amount , token )
export function handleDepositEvent(event: Deposit): void {
  let user = User.load(event.transaction.from.toHexString());
  if (!user) {
    user = new User(event.transaction.from.toHexString());
    user.transactions = [];
  }

  // populate deposit
  let transaction = new Transaction(event.transaction.hash.toHexString());
  
  let asset = Asset.load(event.params.token.toHexString());
  if(!asset) asset = loadAsset(event.params.token);
  transaction.account = event.transaction.from;
  transaction.asset = asset.id;
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

  // populate withdraw
  let transaction = new Transaction(event.transaction.hash.toHexString());

  let asset = Asset.load(event.params.token.toHexString());
  if(!asset) asset = loadAsset(event.params.token);

  transaction.account = event.transaction.from;
  transaction.type = "WITHDRAW";
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
