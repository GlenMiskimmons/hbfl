// Imports
const AWS = require('aws-sdk')
const cfParams = require('./cloudfront-parameters')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
// TODO: Create CloudFront SDK Object
const cf = new AWS.CloudFront();

// createDistribution('/* TODO: Add your bucket name */')
createDistribution('hamster-bucket-glen')
.then(data => console.log(data))

function createDistribution (bucketName) {
  // TODO: Create params const object
  const params = {
    DistributionConfig: {
      CallerReference: `${Date.now()}`,
      Comment: 'HBFL Distribution',
      DefaultCacheBehavior: cfParams.defaultCacheBehavior(bucketName),
      Origins: cfParams.origins(bucketName),
      HttpVersion: 'http2',
      PriceClass: 'PriceClass_100',
      IsIPV6Enabled: true,
      Enabled: true
    }
  }

  return new Promise((resolve, reject) => {
    // TODO: Call createDistribution
    cf.createDistribution(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
