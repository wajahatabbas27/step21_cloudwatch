# CLOUD WATCH (Logs/Metrics/Alarms/Dashboard)

NAMESPACES -> METRICS -> DIMENSIONS -> WIDGETS

- Here we will see how the services are working , can put alarms here , as well as the logs.
- Serverless Computing is totally based on Event Driven Structure
- We can set alarms and events so we can see them on the cloudWatch when the state is achieved or what is happening all the way.
- We can monitor huge amount of data in the cloud watch as there are billions of events that fire at a particular time so therefore cloudwatch is there though helps us see all those events.
- There is namespace as well , where we can define the namespace of a particular service so can see the logs of that particular over there in the namespace
- there are metrics in the namespaces - which tells that how many times the lambda has invoked and run
- Dimensions - It helps us to know which lambda data is this , as there are so many lambda - therefore we define the dimensions.
- Dimensions are unique identifier for those namespaces and we recognize the dimensions using the id
- Diemnsions help us to filter out the data and makes the Desktop using the Widgets.
- widget are of different techniques , which we can use to display the data , there are different types of graphs which can be used

## Cloudwatch - Logs && Metrics

- cloudwatch is default enabled in the lambda function while in any other service we have to therefore integrate it the cloudwatch.
- logs are different and metrics are totally different

- In metrics , we can see them in graph to see , or we can set the alarms for them as well.

- In alarms -e.g when the lambda function fails more than 10 times alarm is trigger and when the alarm is triggered , it sends me notification through the SnS.

## CloudWatch in Console logs/metrics/dashboards

- every service has particular log group and there is the log stream for that particularly.
- when ever a lambda function is triggered , there is a log stream for it in the log group.
- There is also insights into the cloudwatch , which we can use to get the data of our requirement.
- Metrics are also there which shows the data over there as well using the graphs,
- There is throttles in the metrics - which means that a lambda function is triggered more than stated , so it will be counted as the throttle.
- If we came back to the metrics data disappears , so the better way of doing it , is by making the dashboard.
- Dashboard helps us create no. of graphs on the screen and use them to show data to us, which we can monitor.
- And in the dashboard - it asks from where to get the information to create the graph , either from the logs or from the metrics.
- In the Dashboard , each graph is called a widget , it depends upon us how many widgets we get and look.
- The better way of looking is by making the dashboard for the logs and matrics by using the widgets , we wanted that shows us best.

### Alarms on the Metrics

- We basically monitor our metrics and once the throttle value reached so the alarm is triggered by which we can look at it and call a particular service out of it, that is actually really helpful.

# metrics code in cdk to trigger alarm from throttle value then send an email using the sns to email or whatever we wanted:

- we called all the data firstly from the metrics ,
- then use the mathematical expression - which we generate by using the data to invoke the message thats it.
- there are attributes there in the alarm as well therefore , which helps us to trigger alarm as well.
- After alarm is triggered , we will send the message to the topic and the topic will send to the consumer using the sns.
- sns se email subscribe krne ke liye mein email subscribe krni prti hai phle,
- it notifies us when the alarm is triggered.

# Create Dashboard using the CDK

- There we will going to create our dashboard using the cdk and therefore by building the dashboard we will be able to see the widgets graph on the screen (linegraph, histogram)
- we can see the different graphs as well and have the parameters for the graphs as well
