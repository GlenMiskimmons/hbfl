// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
// TODO: Create route53 object
const hzName = 'hbfl.online'
const route53 = new AWS.Route53()

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  // TODO: Create params const
  const params = {
    Name: hzName,
    CallerReference:`${Date.now()}`
  }

  return new Promise((resolve, reject) => {
    // TODO: Create hostedzone with route53
    route53.createHostedZone(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
