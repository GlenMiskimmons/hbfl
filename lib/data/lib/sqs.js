const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

const sqs = new AWS.SQS()

function push (queueName, msg) {
  // TODO: Create params const to get queue URL
  const params = {
    QueueName: queueName
  }

  return new Promise((resolve, reject) => {
    // TODO: Get sqs queue URL
    // Then send message to queue url
    sqs.getQueueUrl(params, (err, data) => {
      if (err) reject(err)
      else {
        const params = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: data.QueueUrl
        }

        sqs.sendMessage(params, (err, data) => {
          if (err) reject(err)
          else resolve()
        })
      }
    })
  })
}

module.exports = { push }
