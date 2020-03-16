// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'uss-east-1' })

// Declare local variables
const route53 = new AWS.Route53()
// const hzId = '/* TODO: Add your hostedzone id */'
const hzId = '/hostedzone/Z1DB4SVTHDV9M'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  // TODO: Create params const
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.online',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-1540229095.us-east-1.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z35SXDOTRQ7X7K'
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    // TODO: Create record set
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
