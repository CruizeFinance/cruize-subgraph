/* eslint-disable prefer-const */
import {
  BigInt,
  BigDecimal,
  ByteArray,
  Value,
  Address,
  Bytes,
  log,
  json,
  TypedMap,
} from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/Cruize/ERC20";
import { ERC20SymbolBytes } from "../generated/Cruize/ERC20SymbolBytes";
import { ERC20NameBytes } from "../generated/Cruize/ERC20NameBytes";
import { Cruize } from "../generated/Cruize/Cruize";
import { PriceFeed } from "../generated/Cruize/PriceFeed";

import { Asset, Token } from "../generated/schema";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
export const ARBITRUM_GOERLI = Address.fromString("0x632C4cbB61802083363662b9CC3889C7bC2C4648");

const ORACLES = new TypedMap<string,string>();
ORACLES.set("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase(),"0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08")  // ETH/USD | 8 DECIMALS
ORACLES.set("0x0BA9C96583F0F1b192872A05e3c4Bc759afD36B2".toLowerCase(),"0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08")  // WETH/USD | 8 DECIMALS
ORACLES.set("0xff737BA76F49bf82D7f13378d787685B0c6669Db".toLowerCase(),"0x6550bc2301936011c1334555e62A87705A81C12C")  // BTC/USD | 8 DECIMALS
ORACLES.set("0x7Ef1F6bBEe3CA066b31642fFc53D42C5435C6937".toLowerCase(),"0x1692Bdd32F31b831caAc1b0c9fAF68613682813b")  // USDC/USD | 8 DECIMALS

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);
export let TEN_TO = BigInt.fromI32(10)

export function toPower(power:BigInt):BigInt {
  return TEN_TO.pow(u8(power.toU32()));
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString("1");
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString("10"));
  }
  return bd;
}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString("1000000000000000000");
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  return eth.toBigDecimal().div(exponentToBigDecimal(new BigInt(18)));
}

export function convertTokenToDecimal(
  tokenAmount: BigDecimal,
  exchangeDecimals: BigInt
): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount;
  }
  return tokenAmount.div(exponentToBigDecimal(exchangeDecimals));
}

export function stringToBigDecimal(amount: string): BigDecimal {
  let tokens = amount.split(" ")[0];
  return BigDecimal.fromString(tokens);
}
export function stringToBigInt(amount: string): BigInt {
  let tokens = amount.split(" ")[0];
  tokens = tokens.split(".")[0];
  return BigInt.fromString(tokens);
}

export function tokensWithSymbol(
  tokens: BigDecimal,
  decimals: BigInt,
  symbol: string
): string {
  return convertTokenToDecimal(tokens, decimals)
    .toString()
    .concat(" " + symbol);
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString());
  const zero = parseFloat(ZERO_BD.toString());
  if (zero == formattedVal) {
    return true;
  }
  return false;
}

export function isNullEthValue(value: string): boolean {
  return (
    value ==
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );
}

class Vault {
  round:BigInt;
  lockedAmount:BigInt;
  pending:BigInt;
  cap:BigInt;
  constructor(_round:BigInt,_lockedAmount:BigInt, _pending:BigInt,_cap:BigInt) {
    this.cap  = _cap;
    this.round  = _round;
    this.pending  = _pending;
    this.lockedAmount  = _lockedAmount;
  }
}

export function fetchVault(token:Address):Vault {
  let cruize = Cruize.bind(ARBITRUM_GOERLI);
  let vault = cruize.try_vaults(token);
  if(vault.reverted){
    return new Vault(ONE_BI,ZERO_BI,ZERO_BI,ZERO_BI);
  }
  return new Vault(
    BigInt.fromU64(vault.value.value0),
    vault.value.value1,
    vault.value.value2,
    vault.value.value4
  )
}

export function getPrice(token:string):BigInt {
  log.debug("Oracle address {} , {}",[token,ORACLES.mustGet(token)]);
    let oracle = ORACLES.get(token);
    if(oracle){
      let instace = PriceFeed.bind(Address.fromString(oracle));
      return instace.latestAnswer();
    }
    return ONE_BI;
}

export function loadAsset(token:Address) :Asset{
  let cruize:Cruize = Cruize.bind(ARBITRUM_GOERLI);
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

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);
  log.info("Fetch Token Symbol {}",[contract._address.toHexString()]);
  // try types string and bytes32 for symbol
  let symbolValue = "unknown";
  let symbolResult = contract.try_symbol();
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol();
    if (!symbolResultBytes.reverted) {
      // for broken pairs that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString();
      }
    }
  } else {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress);
  

  // try types string and bytes32 for name
  let nameValue = "unknown";
  let nameResult = contract.try_name();
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name();
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString();
      }
    }
  } else {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);
  let totalSupplyValue = 0;
  let totalSupplyResult = contract.try_totalSupply();
  if (!totalSupplyResult.reverted) {
    totalSupplyValue = Value.fromBigInt(totalSupplyResult.value).toI32();
  }
  return BigInt.fromI32(totalSupplyValue);
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {

  if(tokenAddress.equals(Address.fromString(ETH_ADDRESS))) return BI_18;
  // hardcode overrides
  let contract = ERC20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = 0;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue);
}

function hexToBigInt(hex: string): BigInt {
  return BigInt.fromSignedBytes(
    ByteArray.fromHexString(hex).reverse() as Bytes
  );
}

