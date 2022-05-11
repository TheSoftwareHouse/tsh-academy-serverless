# Task 1 - Start the workflow

## Where do we start?
Checkout onto branch `task/1` unless already there:
        
        git checkout task/1

In the `serverless.yml` file there's a step function workflow defined, named `ScanCvWorkflow`. You can start it manually by clicking `Start execution` in the [AWS Step Functions Console](https://eu-west-1.console.aws.amazon.com/states/home?region=eu-west-1#/statemachines)

There is also a S3 bucket defined, named `inputBucket`

## Description
What we want to achieve is that the workflow starts automatically as soon as a resume file is uploaded to the input S3 bucket.

A lambda for this purpose already exists:
* see `functions/scan-file/function.yml` 
* see how it subscribes to a `ObjectCreated` event from S3. 
  
Now we need you to add logic to it which will start the workflow execution:

1. Open `functions/scan-file/handler.ts` .
2. Create a new StepFunctions client, preferably outside the `handle()` method,

        const sf = new StepFunctions(); 

3. Don't forget to import the module from AWS SDK by adding the following at the top of the file:
   
        import { SNS, StepFunctions } from "aws-sdk";`

4. In the `handle` method, prepare a unique name for each execution, eg. by appending a uuid to the workflow's name:
   
        const executionName = key + v4();

2. Add logs for easier debugging, eg:
   
        winstonLogger.info("Starting SF execution");
   
3. Trigger the step function by calling:

        await sf
            .startExecution({
            stateMachineArn: config.stateMachineArn,
            input: JSON.stringify({ key, extension }),
            name: executionName,
            })
            .promise();

4.  Redeploy the stack by running:
   
        npx sls deploy --aws-profile=tsh-workshops

## Result
You may now upload one of the test files into your input AWS bucket (find the one containing your username in [S3 Console](https://s3.console.aws.amazon.com/s3/home?region=eu-west-1))

Click your bucket's name and then `Upload` -> `Add files`. Once you've uploaded a file, you should see:
1. A workflow started in [Step Functions console](https://eu-west-1.console.aws.amazon.com/states/home?region=eu-west-1#/statemachines)
2. Log entries from the `scan-file` lambda in [Cloud Watch console](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#) (You need to find a `LogGroup` containing your username.)

### Useful links
- [StartExecution method in AWS SDK](https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartExecution.html)
- [How to invoke Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-invoke-sfn.html)
