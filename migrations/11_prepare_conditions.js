const deployConfig = require("./utils/deployConfig")(artifacts);
const ConditionalTokens = artifacts.require("ConditionalTokens");

module.exports = function(deployer) {
  deployer.then(async () => {
    const pmSystem = await ConditionalTokens.deployed();
    console.log(pmSystem.address)
    // const markets = require("../markets.config");
    // for (const { questionId } of markets) {
      // await pmSystem.prepareCondition(deployConfig.oracle, questionId, 8);
    const newMarkets = require("../src/conf/ipfsmarkets.config.json")
    // for (const { questionId } of markets) {
    console.log(newMarkets.questionId)
    await pmSystem.prepareCondition(deployConfig.oracle, newMarkets.questionId, newMarkets.outcomes.length);
 
    // }
  });
};
