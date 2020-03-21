// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const s3 = new AWS.S3()

// configureS3Site('/* TODO: Add your S3 bucket name */')
configureS3Site('hamster-bucket-glen')
.then(data => console.log(data))

function configureS3Site (bucketName) {
  // TODO: Create params const object
  const params = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      IndexDocument: {
        Suffix: 'index.html'
      }
    }
  }

  return new Promise((resolve, reject) => {
    // Call putBucketWebsite
    s3.putBucketWebsite(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
