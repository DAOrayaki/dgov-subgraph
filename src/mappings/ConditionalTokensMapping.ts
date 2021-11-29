import { BigDecimal, log } from "@graphprotocol/graph-ts";

import {
  ConditionPreparation,
} from "../../generated/ConditionalTokens/ConditionalTokens";

import {
  Condition,
} from "../../generated/schema";
// import { assignQuestionToCondition } from "../utils/condition";
// import { zero } from "./utils/constants";
// import { requireGlobal } from "../utils/global";


export function handleConditionPreparation(event: ConditionPreparation): void {
  let condition = new Condition(event.params.conditionId.toHexString());
  condition.oracle = event.params.oracle;
  condition.questionId = event.params.questionId;
  condition.outcomeSlotCount = event.params.outcomeSlotCount.toI32();
  condition.save();
}
