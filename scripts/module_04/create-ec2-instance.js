// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your regions */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_sg'
const keyName = 'hamster_key'
// const instanceId = '/* TODO: Add the instance Id to stop */'
const instanceId = 'i-052512616cd09f9ad'

stopInstance(instanceId)
.then(() => createInstance(sgName, keyName))
.then((data) => console.log('Created instance with:', data))

function createInstance (sgName, keyName) {
  const params = {
    // ImageId: '/* TODO: Add ami id for aws linux */',
    ImageId: 'ami-0a887e401f7654935',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    Placement: {
      // AvailabilityZone: '/* TODO: Add the az from the instance that is stopping */'
      AvailabilityZone: 'us-east-1f'
    },
    SecurityGroups: [
      sgName
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function stopInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }

  return new Promise((resolve, reject) => {
    ec2.stopInstances(params, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
