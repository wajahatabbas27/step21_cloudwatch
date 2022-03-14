import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';


export class Step01AlarmsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'lambda.handler',
    });

    const errors = lambdaFn.metricErrors();
    const invocations = lambdaFn.metricInvocations();
    const throttle = lambdaFn.metricThrottles();




    const allProblems = new cloudwatch.MathExpression({
      expression: "errors + throttles",
      usingMetrics: {
        errors: errors,
        throttles: throttle
      }
    })


    const problemPercentage = new cloudwatch.MathExpression({
      expression: "(problems / invocations) * 100",
      usingMetrics: {
        problems: allProblems,
        invocations: invocations
      },
      period: Duration.minutes(1),
    })


    const Topic = new sns.Topic(this, 'Topic');

    Topic.addSubscription(
      new subscriptions.EmailSubscription("waris.hasan00@gmail.com")
    );

    const alarm = new cloudwatch.Alarm(this, 'Alarm', {
      metric: problemPercentage,
      threshold: 10,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 1,
    });

    alarm.addAlarmAction(new SnsAction(Topic))
  }
}
