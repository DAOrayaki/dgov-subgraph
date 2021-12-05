const config = require('./config.json')
var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'my mnemonic words from metamask'

module.exports = {
  compilers: {
    solc: {
      version: config.compilers.solc,
      settings: {
        optimizer: config.compilers.optimizer,
        evmVersion: config.compilers.evmVersion,
      },
    }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 62743,
      network_id: '*',
      gas: 6721970,
      gasPrice: 22000000000 // Specified in Wei
    },
    local: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/my-key")
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }

    // development: {
    //   host: '127.0.0.1',
    //   port: 8545,
    //   network_id: '*',
    //   gas: 6721970,
    //   gasPrice: 22000000000 // Specified in Wei
    // }

  }
}
