# Task 3 - Parallel processing

## Where do we start?
Checkout onto branch `task/1` unless already there:
        
        git checkout task/1

In the `serverless.yml` file there's a step function workflow defined, named `ScanCvWorkflow`. 

There is also a S3 bucket defined, named `inputBucket`

You may deploy the whole application stack by running `npx sls deploy` .

When deployed successfully, you will see the deployed step function in [AWS Console](https://eu-west-1.console.aws.amazon.com/states/home?region=eu-west-1#/statemachines). You can start it manually by clicking `Start execution`.

## Description
What we want to achieve is that the workflow starts automatically as soon as a resume file is uploaded to the input S3 bucket.

A lambda for this purpose already exists:
* see `functions/scan-file/function.yml` 
* see how it subscribes to a `ObjectCreated` event from S3. 
  
Now we need you to add logic to it which will start the workflow execution:

1. Open `functions/scan-file/handler.ts`  and start above the `handle()` method, at the following TODO:
   
        // TODO: Create a StepFunctions client here
    
2. Create a new StepFunctions client:

        const sf = new StepFunctions(); 

3. Don't forget to import the module from AWS SDK by adding the following at the top of the file:
   
        import { SNS, StepFunctions } from "aws-sdk";`)

4. Move on to the following TODO in the lambda's entry point, the `handle` method:

        // TODO: Start the workflow here

5. Prepare a unique name for each execution, eg. by appending a uuid to the workflow's name:
   
        const executionName = key + v4();

6. Add a log entry:
   

        winstonLogger.info("Starting SF execution");
   
7. Trigger the step function by calling:

        await sf
            .startExecution({
            stateMachineArn: config.stateMachineArn,
            input: JSON.stringify({ key, extension }),
            name: executionName,
            })
            .promise();

8.  Redeploy the stack by running:
   
        npx sls deploy

## Result
You may now upload one of the test files into your input AWS bucket (find the one containing your username in [S3 Console](https://s3.console.aws.amazon.com/s3/home?region=eu-west-1))

Click your bucket's name and then `Upload` -> `Add files`. Once you've uploaded a file, you should see:
1. A workflow started in [Step Functions console](https://eu-west-1.console.aws.amazon.com/states/home?region=eu-west-1#/statemachines)
2. Log entries from the `scan-file` lambda in [Cloud Watch console](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#) (You need to find a `LogGroup` containing your username.)

### Useful links
- [StartExecution method in AWS SDK](https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartExecution.html)
- [How to invoke Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-invoke-sfn.html)
