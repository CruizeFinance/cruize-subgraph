/* eslint-disable prefer-const */
import {
  BigInt,
  BigDecimal,
  ByteArray,
  Value,
  Address,
  Bytes,
  log,
} from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/Cruize/ERC20";
import { ERC20SymbolBytes } from "../generated/Cruize/ERC20SymbolBytes";
import { ERC20NameBytes } from "../generated/Cruize/ERC20NameBytes";
import { Cruize } from "../generated/Cruize/Cruize";
import { Asset, Token } from "../generated/schema";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
export const ARBITRUM_GOERLI = Address.fromString("0xBd20b3c614Dc27Cb7cDf17e00359D00194cD585E")

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);

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
  cap:BigInt;
  constructor(_round:BigInt,_lockedAmount:BigInt, _cap:BigInt) {
    this.round  = _round;
    this.lockedAmount  = _lockedAmount;
    this.cap  = _cap;
  }
}

export function fetchVault(token:Address):Vault {
  let cruize = Cruize.bind(ARBITRUM_GOERLI);
  let vault = cruize.try_vaults(token);
  if(vault.reverted){
    return new Vault(ONE_BI,ZERO_BI,ZERO_BI);
  }
  return new Vault(
    BigInt.fromU64(vault.value.value0),
    vault.value.value1,
    vault.value.value4
  )
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

