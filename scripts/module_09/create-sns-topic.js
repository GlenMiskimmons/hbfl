// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
// TODO: Create sns object
const sns = new AWS.SNS()
const topicName = 'hamster-topic'


createTopic(topicName)
.then(data => console.log(data))

function createTopic (topicName) {
  // TODO: Create params const
  const params = {
    Name: topicName
  }

  return new Promise((resolve, reject) => {
    // TODO: Create topic
    sns.createTopic(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
