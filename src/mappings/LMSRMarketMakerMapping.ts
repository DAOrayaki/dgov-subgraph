import {
  BigInt,
  log,
  Address,
  BigDecimal,
  Bytes,
} from "@graphprotocol/graph-ts";

import {
  LMSRMarketMaker,
  Condition
} from "../../generated/schema";


import {
  LMSRMarketMakerCreation,
} from "../../generated/LMSRMarketMaker/LMSRMarketMakerFactory"


export function handleLMSRMarketMakerCreation(
  event: LMSRMarketMakerCreation
): void {
  let address = event.params.lmsrMarketMaker;
  let addressHexString = address.toHexString();
  let conditionalTokensAddress = event.params.pmSystem.toHexString();

  // if (conditionalTokensAddress != "{{ConditionalTokens.addressLowerCase}}") {
  //   log.info("cannot index market maker {}: using conditional tokens {}", [
  //     addressHexString,
  //     conditionalTokensAddress,
  //   ]);
  //   return;
  // }

  let lmsr = new LMSRMarketMaker(addressHexString);

  lmsr.creator = event.params.creator;
  lmsr.creationTimestamp = event.block.timestamp;
  // lmsr.factory = event.address.toHexString();

  lmsr.collateralToken = event.params.collateralToken;
  lmsr.fee = event.params.fee;
  lmsr.funding = event.params.funding;

  let conditionIds = event.params.conditionIds;
  let outcomeTokenCount = 1;
  let conditionIdStrs = new Array<string>(conditionIds.length);
  // let conditions = new Array<Condition>(conditionIds.length);
  for (let i = 0; i < conditionIds.length; i++) {
    let conditionIdStr = conditionIds[i].toHexString();

    let condition = Condition.load(conditionIdStr);
    if (condition == null) {
      log.error("failed to create market maker {}: condition {} not prepared", [
        addressHexString,
        conditionIdStr,
      ]);
      return;
    }

    outcomeTokenCount *= condition.outcomeSlotCount;
    conditionIdStrs[i] = conditionIdStr;
    // conditions[i] = condition
  }
  lmsr.conditions = conditionIdStrs;
  // lmsr.outcomeSlotCount = outcomeTokenCount;

  if (conditionIdStrs.length == 1) {
    let conditionIdStr = conditionIdStrs[0];
    lmsr.condition = conditionIdStr;

    let condition = Condition.load(conditionIdStr);
    if (condition == null) {
      log.error("failed to create market maker {}: condition {} not prepared", [
        addressHexString,
        conditionIdStr,
      ]);
      return;
    }

    lmsr.oracle = condition.oracle
    lmsr.questionId = condition.questionId
    lmsr.outcomeSlotCount = condition.outcomeSlotCount
  }

  lmsr.save();

}