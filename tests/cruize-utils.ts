import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CreateTokenEvent,
  DepositEvent,
  WithdrawEvent
} from "../generated/Cruize/Cruize"


export function createCreateTokenEvent(
  asset: Address,
  crToken: Address,
  name: string,
  symbol: string,
  decimal: i32
): CreateTokenEvent {
  let createTokenEvent = changetype<CreateTokenEvent>(newMockEvent())

  createTokenEvent.parameters = new Array()

  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "asset",
      ethereum.Value.fromAddress(asset)
    )
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "crToken",
      ethereum.Value.fromAddress(crToken)
    )
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "symbol",
      ethereum.Value.fromString(symbol)
    )
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "decimal",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(decimal))
    )
  )

  return createTokenEvent
}

export function createDepositEventEvent(
  asset: Address,
  account: Address,
  amount: BigInt
): DepositEvent {
  let depositEventEvent = changetype<DepositEvent>(newMockEvent())

  depositEventEvent.parameters = new Array()

  depositEventEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  depositEventEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  depositEventEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(amount)
    )
  )

  return depositEventEvent
}

export function createWithdrawEventEvent(
  asset: Address,
  amount: BigInt,
  isPriceFloor:boolean
): WithdrawEvent {
  let withdrawEventEvent = changetype<WithdrawEvent>(newMockEvent())

  withdrawEventEvent.parameters = new Array()

  withdrawEventEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  withdrawEventEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(amount)
    )
  )

  withdrawEventEvent.parameters.push(
    new ethereum.EventParam(
      "isPriceFloor",
      ethereum.Value.fromBoolean(isPriceFloor)
    )
  )

  return withdrawEventEvent
}
