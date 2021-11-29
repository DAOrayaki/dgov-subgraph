import { create } from 'ipfs-http-client'
const writeToConfig = require("./utils/writeToConfig");
const markets = require("../markets.config");
const newMarkets = require("../src/conf/ipfsmarkets.config.json")

const client = create('http://127.0.0.1:5001')

async function main() {
      var cid = newMarkets.questionId 
      const stream = client.cat(cid)
      let data = ''

      for await ( const chunk of stream) {
          data += chunk.toString()
      }

      var markets = JSON.parse(data)

      console.log(markets[0].questionId)
      console.log(markets[0].title)
      console.log(markets[0].outcomes)
}

main()

