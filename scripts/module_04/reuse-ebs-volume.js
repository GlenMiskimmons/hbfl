// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
// const volumeId = '/* TODO: Add the volume to detach/attach */'
// const instanceId = '/* TODO: Add the instance to attach to */'
const volumeId = 'vol-0c6062459845444fb'
const instanceId = 'i-02dcbb8ba8110142f'

detachVolume(volumeId)
.then(() => attachVolume(instanceId, volumeId))

function detachVolume (volumeId) {
  // TODO: Configure detachVolume params
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    // TODO: Detach the volume
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  // TODO: Configure attachVolume params
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    // TODO: Attach the volume
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
