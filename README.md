# BSC-Contracts

From [https://github.com/mathwallet/BSC-Contracts](https://github.com/mathwallet/BSC-Contracts)

## required information

### market
oracle address
qustionid
slotnumber

### fpmm
network
networkId
lmsrAddress
markets[
    {
        questionsId
        title
        outcomes: [
            {
                title
                short
            }
        ]
    }
]

## event in smart contract

### market

#### event  defintion

    event LMSRMarketMakerCreation(address indexed creator, LMSRMarketMaker lmsrMarketMaker, ConditionalTokens pmSystem, IERC20 collateralToken, bytes32[] conditionIds, uint64 fee, uint funding);

#### event emit

    emit LMSRMarketMakerCreation(msg.sender, lmsrMarketMaker, pmSystem, collateralToken, conditionIds, fee, funding);


### condional token

#### the event defining

    /// @dev Emitted upon the successful preparation of a condition.
    /// @param conditionId The condition's ID. This ID may be derived from the other three parameters via ``keccak256(abi.encodePacked(oracle, questionId, outcomeSlotCount))``.
    /// @param oracle The account assigned to report the result for the prepared condition.
    /// @param questionId An identifier for the question to be answered by the oracle.
    /// @param outcomeSlotCount The number of outcome slots which should be used for this condition. Must not exceed 256.
    event ConditionPreparation(
        bytes32 indexed conditionId,
        address indexed oracle,
        bytes32 indexed questionId,
        uint outcomeSlotCount
    );

#### event emit

    emit ConditionPreparation(conditionId, oracle, questionId, outcomeSlotCount);
