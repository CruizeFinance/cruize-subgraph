import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
} from "matchstick-as/assembly/index";
import { Address ,BigInt} from "@graphprotocol/graph-ts";
import { createCreateTokenEvent, createDepositEventEvent, createWithdrawEventEvent } from "./cruize-utils";
import { handleCreateToken, handleDepositEvent, handleWithdrawEvent } from "../src/cruize";

describe("Cruize Events", () => {
  beforeAll(() => {});

  afterAll(() => {
    clearStore();
  });

  test("should create new asset", () => {
    let asset = Address.fromString(
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    let crToken = Address.fromString(
      "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    );

    let name = "Cruize ETH";
    let symbol = "crETH";
    let decimal = i32(18);
    let newTokenEvent = createCreateTokenEvent(
      asset,
      crToken,
      name,
      symbol,
      decimal
    );
    handleCreateToken(newTokenEvent);
    const txId = newTokenEvent.transaction.from.toHexString()
    assert.fieldEquals("Asset",txId,"id",txId)
    assert.fieldEquals("Token",asset.toHexString(),"symbol","ETH")
    assert.fieldEquals("Token",crToken.toHexString(),"symbol","crETH")
  });

  test("should create deposit event", () => {
    let asset = Address.fromString(
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    let account = Address.fromString("0x77c45699A715A64A7a7796d5CEe884cf617D5254");
    let amount = BigInt.fromString("100000000000000000");
    let newTokenEvent = createDepositEventEvent(
      asset,
      account,
      amount
    );

    newTokenEvent.transaction.from = Address.fromString("0x77c45699A715A64A7a7796d5CEe884cf617D5254")
    let newTokenEvent0 = createDepositEventEvent(
      asset,
      account,
      amount
      );
      newTokenEvent.transaction.from = Address.fromString("0x71327eAd390cd54Bf2424178bCBCd03f72203c95")
    handleDepositEvent(newTokenEvent);
    handleDepositEvent(newTokenEvent0);
  });

  test("should create withdraw event", () => {
    let asset = Address.fromString(
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    let amount = BigInt.fromString("100000000000000000");
    let newTokenEvent = createWithdrawEventEvent(
      asset,
      amount,
      false
    );
    newTokenEvent.transaction.from = Address.fromString("0x71327eAd390cd54Bf2424178bCBCd03f72203c95")
    handleWithdrawEvent(newTokenEvent);

    logStore()
  });


});
