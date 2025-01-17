// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const sns = new AWS.SNS()
const type = 'sms'
// const endpoint = '/* TODO: Add your mobile number with country code */'
const endpoint = '447784462384'
// const topicArn = '/* TODO: Add your sns topic arn */'
const topicArn = 'arn:aws:sns:us-east-1:419692414704:hamster-topic'

createSubscription(type, topicArn, endpoint)
.then(data => console.log(data))

function createSubscription (type, topicArn, endpoint) {
  // TODO: Create params const
  const params = {
    Protocol: type,
    TopicArn: topicArn,
    Endpoint: endpoint
  }

  return new Promise((resolve, reject) => {
    // TODO: Subscribe
    sns.subscribe(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
