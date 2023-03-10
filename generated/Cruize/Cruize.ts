// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AvatarSet extends ethereum.Event {
  get params(): AvatarSet__Params {
    return new AvatarSet__Params(this);
  }
}

export class AvatarSet__Params {
  _event: AvatarSet;

  constructor(event: AvatarSet) {
    this._event = event;
  }

  get previousAvatar(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAvatar(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class CapSet extends ethereum.Event {
  get params(): CapSet__Params {
    return new CapSet__Params(this);
  }
}

export class CapSet__Params {
  _event: CapSet;

  constructor(event: CapSet) {
    this._event = event;
  }

  get oldCap(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newCap(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ChangedGuard extends ethereum.Event {
  get params(): ChangedGuard__Params {
    return new ChangedGuard__Params(this);
  }
}

export class ChangedGuard__Params {
  _event: ChangedGuard;

  constructor(event: ChangedGuard) {
    this._event = event;
  }

  get guard(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CloseRound extends ethereum.Event {
  get params(): CloseRound__Params {
    return new CloseRound__Params(this);
  }
}

export class CloseRound__Params {
  _event: CloseRound;

  constructor(event: CloseRound) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get round(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get SharePerUnit(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get lockedAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class CreateToken extends ethereum.Event {
  get params(): CreateToken__Params {
    return new CreateToken__Params(this);
  }
}

export class CreateToken__Params {
  _event: CreateToken;

  constructor(event: CreateToken) {
    this._event = event;
  }

  get tokenAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get crTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenName(): string {
    return this._event.parameters[2].value.toString();
  }

  get tokenSymbol(): string {
    return this._event.parameters[3].value.toString();
  }

  get decimal(): i32 {
    return this._event.parameters[4].value.toI32();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class InstantWithdrawal extends ethereum.Event {
  get params(): InstantWithdrawal__Params {
    return new InstantWithdrawal__Params(this);
  }
}

export class InstantWithdrawal__Params {
  _event: InstantWithdrawal;

  constructor(event: InstantWithdrawal) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get currentRound(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TargetSet extends ethereum.Event {
  get params(): TargetSet__Params {
    return new TargetSet__Params(this);
  }
}

export class TargetSet__Params {
  _event: TargetSet;

  constructor(event: TargetSet) {
    this._event = event;
  }

  get previousTarget(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newTarget(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class completeStandardWithdrawal extends ethereum.Event {
  get params(): completeStandardWithdrawal__Params {
    return new completeStandardWithdrawal__Params(this);
  }
}

export class completeStandardWithdrawal__Params {
  _event: completeStandardWithdrawal;

  constructor(event: completeStandardWithdrawal) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class initiateStandardWithdrawal extends ethereum.Event {
  get params(): initiateStandardWithdrawal__Params {
    return new initiateStandardWithdrawal__Params(this);
  }
}

export class initiateStandardWithdrawal__Params {
  _event: initiateStandardWithdrawal;

  constructor(event: initiateStandardWithdrawal) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Cruize__depositReceiptsResult {
  value0: i32;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: i32, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getRound(): i32 {
    return this.value0;
  }

  getAmount(): BigInt {
    return this.value1;
  }

  getUnredeemedShares(): BigInt {
    return this.value2;
  }

  getLockedAmount(): BigInt {
    return this.value3;
  }
}

export class Cruize__shareBalancesResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getHeldByAccount(): BigInt {
    return this.value0;
  }

  getHeldByVault(): BigInt {
    return this.value1;
  }
}

export class Cruize__vaultsResult {
  value0: i32;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: i32,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getRound(): i32 {
    return this.value0;
  }

  getLockedAmount(): BigInt {
    return this.value1;
  }

  getTotalPending(): BigInt {
    return this.value2;
  }

  getQueuedWithdrawShares(): BigInt {
    return this.value3;
  }

  getCap(): BigInt {
    return this.value4;
  }
}

export class Cruize__withdrawalsResult {
  value0: i32;
  value1: BigInt;

  constructor(value0: i32, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getRound(): i32 {
    return this.value0;
  }

  getShares(): BigInt {
    return this.value1;
  }
}

export class Cruize extends ethereum.SmartContract {
  static bind(address: Address): Cruize {
    return new Cruize("Cruize", address);
  }

  avatar(): Address {
    let result = super.call("avatar", "avatar():(address)", []);

    return result[0].toAddress();
  }

  try_avatar(): ethereum.CallResult<Address> {
    let result = super.tryCall("avatar", "avatar():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  balanceOf(token: Address, account: Address): BigInt {
    let result = super.call(
      "balanceOf",
      "balanceOf(address,address):(uint256)",
      [ethereum.Value.fromAddress(token), ethereum.Value.fromAddress(account)]
    );

    return result[0].toBigInt();
  }

  try_balanceOf(token: Address, account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "balanceOf",
      "balanceOf(address,address):(uint256)",
      [ethereum.Value.fromAddress(token), ethereum.Value.fromAddress(account)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOfUser(_token: Address, user: Address): BigInt {
    let result = super.call(
      "balanceOfUser",
      "balanceOfUser(address,address):(uint256)",
      [ethereum.Value.fromAddress(_token), ethereum.Value.fromAddress(user)]
    );

    return result[0].toBigInt();
  }

  try_balanceOfUser(
    _token: Address,
    user: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "balanceOfUser",
      "balanceOfUser(address,address):(uint256)",
      [ethereum.Value.fromAddress(_token), ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  cruizeTokens(param0: Address): Address {
    let result = super.call("cruizeTokens", "cruizeTokens(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_cruizeTokens(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "cruizeTokens",
      "cruizeTokens(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  currentQueuedWithdrawalShares(param0: Address): BigInt {
    let result = super.call(
      "currentQueuedWithdrawalShares",
      "currentQueuedWithdrawalShares(address):(uint128)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_currentQueuedWithdrawalShares(
    param0: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "currentQueuedWithdrawalShares",
      "currentQueuedWithdrawalShares(address):(uint128)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  depositReceipts(
    param0: Address,
    param1: Address
  ): Cruize__depositReceiptsResult {
    let result = super.call(
      "depositReceipts",
      "depositReceipts(address,address):(uint16,uint104,uint128,uint104)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return new Cruize__depositReceiptsResult(
      result[0].toI32(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_depositReceipts(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<Cruize__depositReceiptsResult> {
    let result = super.tryCall(
      "depositReceipts",
      "depositReceipts(address,address):(uint16,uint104,uint128,uint104)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Cruize__depositReceiptsResult(
        value[0].toI32(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  getFeeRecipient(): Address {
    let result = super.call(
      "getFeeRecipient",
      "getFeeRecipient():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getFeeRecipient(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getFeeRecipient",
      "getFeeRecipient():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getGuard(): Address {
    let result = super.call("getGuard", "getGuard():(address)", []);

    return result[0].toAddress();
  }

  try_getGuard(): ethereum.CallResult<Address> {
    let result = super.tryCall("getGuard", "getGuard():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getManagementFee(): BigInt {
    let result = super.call(
      "getManagementFee",
      "getManagementFee():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getManagementFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getManagementFee",
      "getManagementFee():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUserLockedAmount(user: Address, token: Address): BigInt {
    let result = super.call(
      "getUserLockedAmount",
      "getUserLockedAmount(address,address):(uint256)",
      [ethereum.Value.fromAddress(user), ethereum.Value.fromAddress(token)]
    );

    return result[0].toBigInt();
  }

  try_getUserLockedAmount(
    user: Address,
    token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getUserLockedAmount",
      "getUserLockedAmount(address,address):(uint256)",
      [ethereum.Value.fromAddress(user), ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  guard(): Address {
    let result = super.call("guard", "guard():(address)", []);

    return result[0].toAddress();
  }

  try_guard(): ethereum.CallResult<Address> {
    let result = super.tryCall("guard", "guard():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  lastQueuedWithdrawAmounts(param0: Address): BigInt {
    let result = super.call(
      "lastQueuedWithdrawAmounts",
      "lastQueuedWithdrawAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_lastQueuedWithdrawAmounts(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastQueuedWithdrawAmounts",
      "lastQueuedWithdrawAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  roundPricePerShare(param0: Address, param1: i32): BigInt {
    let result = super.call(
      "roundPricePerShare",
      "roundPricePerShare(address,uint16):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param1))
      ]
    );

    return result[0].toBigInt();
  }

  try_roundPricePerShare(
    param0: Address,
    param1: i32
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "roundPricePerShare",
      "roundPricePerShare(address,uint16):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param1))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  shareBalances(token: Address, account: Address): Cruize__shareBalancesResult {
    let result = super.call(
      "shareBalances",
      "shareBalances(address,address):(uint256,uint256)",
      [ethereum.Value.fromAddress(token), ethereum.Value.fromAddress(account)]
    );

    return new Cruize__shareBalancesResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_shareBalances(
    token: Address,
    account: Address
  ): ethereum.CallResult<Cruize__shareBalancesResult> {
    let result = super.tryCall(
      "shareBalances",
      "shareBalances(address,address):(uint256,uint256)",
      [ethereum.Value.fromAddress(token), ethereum.Value.fromAddress(account)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Cruize__shareBalancesResult(value[0].toBigInt(), value[1].toBigInt())
    );
  }

  target(): Address {
    let result = super.call("target", "target():(address)", []);

    return result[0].toAddress();
  }

  try_target(): ethereum.CallResult<Address> {
    let result = super.tryCall("target", "target():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalBalance(token: Address): BigInt {
    let result = super.call("totalBalance", "totalBalance(address):(uint256)", [
      ethereum.Value.fromAddress(token)
    ]);

    return result[0].toBigInt();
  }

  try_totalBalance(token: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalBalance",
      "totalBalance(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalTokenPending(token: Address): BigInt {
    let result = super.call(
      "totalTokenPending",
      "totalTokenPending(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );

    return result[0].toBigInt();
  }

  try_totalTokenPending(token: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalTokenPending",
      "totalTokenPending(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vaults(param0: Address): Cruize__vaultsResult {
    let result = super.call(
      "vaults",
      "vaults(address):(uint16,uint104,uint128,uint128,uint104)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new Cruize__vaultsResult(
      result[0].toI32(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_vaults(param0: Address): ethereum.CallResult<Cruize__vaultsResult> {
    let result = super.tryCall(
      "vaults",
      "vaults(address):(uint16,uint104,uint128,uint128,uint104)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Cruize__vaultsResult(
        value[0].toI32(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  withdrawals(param0: Address, param1: Address): Cruize__withdrawalsResult {
    let result = super.call(
      "withdrawals",
      "withdrawals(address,address):(uint16,uint128)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return new Cruize__withdrawalsResult(
      result[0].toI32(),
      result[1].toBigInt()
    );
  }

  try_withdrawals(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<Cruize__withdrawalsResult> {
    let result = super.tryCall(
      "withdrawals",
      "withdrawals(address,address):(uint16,uint128)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Cruize__withdrawalsResult(value[0].toI32(), value[1].toBigInt())
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _vault(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _crContract(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _managementFee(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CloseRoundCall extends ethereum.Call {
  get inputs(): CloseRoundCall__Inputs {
    return new CloseRoundCall__Inputs(this);
  }

  get outputs(): CloseRoundCall__Outputs {
    return new CloseRoundCall__Outputs(this);
  }
}

export class CloseRoundCall__Inputs {
  _call: CloseRoundCall;

  constructor(call: CloseRoundCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CloseRoundCall__Outputs {
  _call: CloseRoundCall;

  constructor(call: CloseRoundCall) {
    this._call = call;
  }
}

export class CreateTokenCall extends ethereum.Call {
  get inputs(): CreateTokenCall__Inputs {
    return new CreateTokenCall__Inputs(this);
  }

  get outputs(): CreateTokenCall__Outputs {
    return new CreateTokenCall__Outputs(this);
  }
}

export class CreateTokenCall__Inputs {
  _call: CreateTokenCall;

  constructor(call: CreateTokenCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get decimal(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get tokencap(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class CreateTokenCall__Outputs {
  _call: CreateTokenCall;

  constructor(call: CreateTokenCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class GetUserLockedAmountCall extends ethereum.Call {
  get inputs(): GetUserLockedAmountCall__Inputs {
    return new GetUserLockedAmountCall__Inputs(this);
  }

  get outputs(): GetUserLockedAmountCall__Outputs {
    return new GetUserLockedAmountCall__Outputs(this);
  }
}

export class GetUserLockedAmountCall__Inputs {
  _call: GetUserLockedAmountCall;

  constructor(call: GetUserLockedAmountCall) {
    this._call = call;
  }

  get user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GetUserLockedAmountCall__Outputs {
  _call: GetUserLockedAmountCall;

  constructor(call: GetUserLockedAmountCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class InitRoundsCall extends ethereum.Call {
  get inputs(): InitRoundsCall__Inputs {
    return new InitRoundsCall__Inputs(this);
  }

  get outputs(): InitRoundsCall__Outputs {
    return new InitRoundsCall__Outputs(this);
  }
}

export class InitRoundsCall__Inputs {
  _call: InitRoundsCall;

  constructor(call: InitRoundsCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get numRounds(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class InitRoundsCall__Outputs {
  _call: InitRoundsCall;

  constructor(call: InitRoundsCall) {
    this._call = call;
  }
}

export class InitiateWithdrawalCall extends ethereum.Call {
  get inputs(): InitiateWithdrawalCall__Inputs {
    return new InitiateWithdrawalCall__Inputs(this);
  }

  get outputs(): InitiateWithdrawalCall__Outputs {
    return new InitiateWithdrawalCall__Outputs(this);
  }
}

export class InitiateWithdrawalCall__Inputs {
  _call: InitiateWithdrawalCall;

  constructor(call: InitiateWithdrawalCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class InitiateWithdrawalCall__Outputs {
  _call: InitiateWithdrawalCall;

  constructor(call: InitiateWithdrawalCall) {
    this._call = call;
  }
}

export class InstantWithdrawCall extends ethereum.Call {
  get inputs(): InstantWithdrawCall__Inputs {
    return new InstantWithdrawCall__Inputs(this);
  }

  get outputs(): InstantWithdrawCall__Outputs {
    return new InstantWithdrawCall__Outputs(this);
  }
}

export class InstantWithdrawCall__Inputs {
  _call: InstantWithdrawCall;

  constructor(call: InstantWithdrawCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class InstantWithdrawCall__Outputs {
  _call: InstantWithdrawCall;

  constructor(call: InstantWithdrawCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetAvatarCall extends ethereum.Call {
  get inputs(): SetAvatarCall__Inputs {
    return new SetAvatarCall__Inputs(this);
  }

  get outputs(): SetAvatarCall__Outputs {
    return new SetAvatarCall__Outputs(this);
  }
}

export class SetAvatarCall__Inputs {
  _call: SetAvatarCall;

  constructor(call: SetAvatarCall) {
    this._call = call;
  }

  get _avatar(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetAvatarCall__Outputs {
  _call: SetAvatarCall;

  constructor(call: SetAvatarCall) {
    this._call = call;
  }
}

export class SetCapCall extends ethereum.Call {
  get inputs(): SetCapCall__Inputs {
    return new SetCapCall__Inputs(this);
  }

  get outputs(): SetCapCall__Outputs {
    return new SetCapCall__Outputs(this);
  }
}

export class SetCapCall__Inputs {
  _call: SetCapCall;

  constructor(call: SetCapCall) {
    this._call = call;
  }

  get newCap(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetCapCall__Outputs {
  _call: SetCapCall;

  constructor(call: SetCapCall) {
    this._call = call;
  }
}

export class SetFeeRecipientCall extends ethereum.Call {
  get inputs(): SetFeeRecipientCall__Inputs {
    return new SetFeeRecipientCall__Inputs(this);
  }

  get outputs(): SetFeeRecipientCall__Outputs {
    return new SetFeeRecipientCall__Outputs(this);
  }
}

export class SetFeeRecipientCall__Inputs {
  _call: SetFeeRecipientCall;

  constructor(call: SetFeeRecipientCall) {
    this._call = call;
  }

  get feeRecipient_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetFeeRecipientCall__Outputs {
  _call: SetFeeRecipientCall;

  constructor(call: SetFeeRecipientCall) {
    this._call = call;
  }
}

export class SetGuardCall extends ethereum.Call {
  get inputs(): SetGuardCall__Inputs {
    return new SetGuardCall__Inputs(this);
  }

  get outputs(): SetGuardCall__Outputs {
    return new SetGuardCall__Outputs(this);
  }
}

export class SetGuardCall__Inputs {
  _call: SetGuardCall;

  constructor(call: SetGuardCall) {
    this._call = call;
  }

  get _guard(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetGuardCall__Outputs {
  _call: SetGuardCall;

  constructor(call: SetGuardCall) {
    this._call = call;
  }
}

export class SetManagementFeeCall extends ethereum.Call {
  get inputs(): SetManagementFeeCall__Inputs {
    return new SetManagementFeeCall__Inputs(this);
  }

  get outputs(): SetManagementFeeCall__Outputs {
    return new SetManagementFeeCall__Outputs(this);
  }
}

export class SetManagementFeeCall__Inputs {
  _call: SetManagementFeeCall;

  constructor(call: SetManagementFeeCall) {
    this._call = call;
  }

  get managementFee_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetManagementFeeCall__Outputs {
  _call: SetManagementFeeCall;

  constructor(call: SetManagementFeeCall) {
    this._call = call;
  }
}

export class SetTargetCall extends ethereum.Call {
  get inputs(): SetTargetCall__Inputs {
    return new SetTargetCall__Inputs(this);
  }

  get outputs(): SetTargetCall__Outputs {
    return new SetTargetCall__Outputs(this);
  }
}

export class SetTargetCall__Inputs {
  _call: SetTargetCall;

  constructor(call: SetTargetCall) {
    this._call = call;
  }

  get _target(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTargetCall__Outputs {
  _call: SetTargetCall;

  constructor(call: SetTargetCall) {
    this._call = call;
  }
}

export class SetUpCall extends ethereum.Call {
  get inputs(): SetUpCall__Inputs {
    return new SetUpCall__Inputs(this);
  }

  get outputs(): SetUpCall__Outputs {
    return new SetUpCall__Outputs(this);
  }
}

export class SetUpCall__Inputs {
  _call: SetUpCall;

  constructor(call: SetUpCall) {
    this._call = call;
  }

  get initializeParams(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class SetUpCall__Outputs {
  _call: SetUpCall;

  constructor(call: SetUpCall) {
    this._call = call;
  }
}

export class StandardWithdrawCall extends ethereum.Call {
  get inputs(): StandardWithdrawCall__Inputs {
    return new StandardWithdrawCall__Inputs(this);
  }

  get outputs(): StandardWithdrawCall__Outputs {
    return new StandardWithdrawCall__Outputs(this);
  }
}

export class StandardWithdrawCall__Inputs {
  _call: StandardWithdrawCall;

  constructor(call: StandardWithdrawCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class StandardWithdrawCall__Outputs {
  _call: StandardWithdrawCall;

  constructor(call: StandardWithdrawCall) {
    this._call = call;
  }
}

export class TransferFromSafeCall extends ethereum.Call {
  get inputs(): TransferFromSafeCall__Inputs {
    return new TransferFromSafeCall__Inputs(this);
  }

  get outputs(): TransferFromSafeCall__Outputs {
    return new TransferFromSafeCall__Outputs(this);
  }
}

export class TransferFromSafeCall__Inputs {
  _call: TransferFromSafeCall;

  constructor(call: TransferFromSafeCall) {
    this._call = call;
  }

  get _paymentToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromSafeCall__Outputs {
  _call: TransferFromSafeCall;

  constructor(call: TransferFromSafeCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
