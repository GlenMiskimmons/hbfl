// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
// TODO: Create kinesis object
const streamName = 'hamster-race-results'
const kinesis = new AWS.Kinesis()

createKinesisStream(streamName)
.then(data => console.log(data))

function createKinesisStream (streamName) {
  // TODO: Create params const
  const parms = {
    ShardCount: 1,
    StreamName: streamName
  }

  return new Promise((resolve, reject) => {
    // TODO: Create kinesis stream
    kinesis.createStream(parms, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
