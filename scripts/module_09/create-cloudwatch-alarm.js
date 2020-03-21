// Imports
const AWS = require('aws-sdk')

// AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
// const topicArn = '/* TODO: Add your SNS topic ARN */'
const topicArn = 'arn:aws:sns:us-east-1:419692414704:hamster-topic'
// const tg = '/* TODO: Add last part of Target Group ARN */'
const tg = 'targetgroup/hamsterTG/0025afa082ec03f7'
// const lb = '/* TODO: Add last part of Load Balancer ARN */'
const lb = '/app/hamsterELB/03505ce25c30f571'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
.then(data => console.log(data))

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  // TODO: Create params const object
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ApplicationELB',
    Period: 60,
    Threshold: 1,
    AlarmActions: [
      topicArn
    ],
    Dimensions: [
      {
        Name: 'TargetGroup',
        Value: tg
      },
      {
        Name: 'LoadBalancer',
        Value: lb
      }
    ],
    Statistic: 'Average',
    TreatMissingData: 'breaching'
  }

  return new Promise((resolve, reject) => {
    // TODO: Call putMetricAlarm
    cw.putMetricAlarm(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
