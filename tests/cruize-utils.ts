import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CreateToken
} from "../generated/Cruize/Cruize"


export function createCreateTokenEvent(
  token: Address,
  crToken: Address,
  tokenName: string,
  tokenSymbol: string,
  decimal: i32,
  tokenCap:i32
): CreateToken {
  let createTokenEvent = changetype<CreateToken>(newMockEvent())

  createTokenEvent.parameters = new Array()

  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "token",
      ethereum.Value.fromAddress(token)
    )
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "crToken",
      ethereum.Value.fromAddress(crToken)
    )
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam("tokenName", ethereum.Value.fromString(tokenName))
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "tokenSymbol",
      ethereum.Value.fromString(tokenSymbol)
    )
  )
  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "decimal",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(decimal))
    )
  )

  createTokenEvent.parameters.push(
    new ethereum.EventParam(
      "tokenCap",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(tokenCap))
    )
  )

  return createTokenEvent
}


// export function createDepositEventEvent(
//   asset: Address,
//   account: Address,
//   amount: BigInt
// ): DepositEvent {
//   let depositEventEvent = changetype<DepositEvent>(newMockEvent())

//   depositEventEvent.parameters = new Array()

//   depositEventEvent.parameters.push(
//     new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
//   )
//   depositEventEvent.parameters.push(
//     new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
//   )
//   depositEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "amount",
//       ethereum.Value.fromUnsignedBigInt(amount)
//     )
//   )

//   return depositEventEvent
// }

// export function createWithdrawEventEvent(
//   asset: Address,
//   amount: BigInt,
//   isPriceFloor:boolean
// ): WithdrawEvent {
//   let withdrawEventEvent = changetype<WithdrawEvent>(newMockEvent())

//   withdrawEventEvent.parameters = new Array()

//   withdrawEventEvent.parameters.push(
//     new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
//   )
//   withdrawEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "amount",
//       ethereum.Value.fromUnsignedBigInt(amount)
//     )
//   )

//   withdrawEventEvent.parameters.push(
//     new ethereum.EventParam(
//       "isPriceFloor",
//       ethereum.Value.fromBoolean(isPriceFloor)
//     )
//   )

//   return withdrawEventEvent
// }
