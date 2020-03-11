// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const s3 = new AWS.S3()
// const bucketName = '/* TODO: Make this bucket name match what you created */'
const bucketName = 'hamster-bucket-glen'

helpers.getPublicFiles()
.then(files => uploadS3Objects(bucketName, files))
.then(data => console.log(data))

function uploadS3Objects (bucketName, files) {
  // TODO: Define putObject params object
  const params = {
    Bucket: bucketName,
    ACL: 'public-read'
  }

  const filePromises = files.map((file) => {
    const newParams = Object.assign({}, params, {
      // TODO: Add individual file params
      Body: file.contets,
      Key: file.name,
      ContentType: helpers.getContentType(file.name)
    })

    return new Promise((resolve, reject) => {
      // TODO: Put objects in S3
      s3.putObject(newParams, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  })

  return Promise.all(filePromises)
}
