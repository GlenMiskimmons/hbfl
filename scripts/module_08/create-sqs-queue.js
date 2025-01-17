// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
// TODO: Create sqs object
const queueName = 'hamster-race-results'
const sqs = new AWS.SQS()

createQueue(queueName)
.then(data => console.log(data))

function createQueue (queueName) {
  // TODO: Create params const for creating queue
  const params = {
    QueueName: queueName,
    Attributes: {
      DelaySeconds: '0',
      MessageRetentionPeriod: '345600',
      VisibilityTimeout: '30',
      ReceiveMessageWaitTimeSeconds: '0'
    }
  }

  return new Promise((resolve, reject) => {
    sqs.createQueue(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
