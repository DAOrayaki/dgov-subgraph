const config = require('./config.json')

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
      port: 8545,
      network_id: '*',
      gas: 6721970,
      gasPrice: 22000000000 // Specified in Wei
    }
  }
}
