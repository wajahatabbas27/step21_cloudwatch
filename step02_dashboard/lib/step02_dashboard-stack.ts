import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';


export class Step02DashboardStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'lambda.handler',
    });

    const errors = lambdaFn.metricErrors({
      statistic: 'avg',
      period: Duration.minutes(1),
    });

    const duration = lambdaFn.metricDuration();


    const dash = new cloudwatch.Dashboard(this, "dash");

    const widget = new cloudwatch.GraphWidget({

      title: "Executions vs error rate",

      left: [errors],
      right: [duration],

      view: cloudwatch.GraphWidgetView.BAR,
      liveData: true
    })

    const textWidget = new cloudwatch.TextWidget({
      markdown: '# Key Performance Indicators'
    });

    dash.addWidgets(textWidget);
    dash.addWidgets(widget);
  }
}
