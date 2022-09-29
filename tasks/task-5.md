# Task 5 - Native Integrations

## Where do we start?
In the previous task we have checked calculated total score of candidate resume.

<img src="../data/task-4-result.png"/>

## Description
In this exercise you are asked to sort the resume files into two separate S3 buckets: one for accepted and one for rejected resumes.

1. Add two S3 bucket definitions in `serverless.yml` file (use e.g. inputBucket as an example):
   1. `matchedFilesBucket`
   2. `rejectedFilesBucket`
2. Make sure you've stored the names of the buckets in `custom:` variables section in `serverless.yml` .
3. Add a new step `checkScore` in `workflow.asl.yml` file.
   1. It should be `Choice` step.
   2. It should transition to a new step, `saveToMatchedBucket` when the calculated score is greater than `100`.
   3. By default, it should transition to `saveToRejectedBucket`.
4. Define the new steps, `saveToMatchedBucket` and `saveToRejectedBucket` in `workflow.asl.yml` file.
   1. This time, the new steps are not going to call any lambdas - but [call native AWS S3 API](https://docs.aws.amazon.com/step-functions/latest/dg/supported-services-awssdk.html) instead.
   2. In order to copy the resume file to one of the buckets, use the [`copyObject`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property) method.
   

**Passsing parameters**

We're going to use two different ways of passing parameters to the native SDK integration:
* static values: to pass a value stored in Serverless' `custom:` section, it's going to be simply referenced after the name of the API method's parameter. Example:
```yaml
Parameters:
   ParameterFoo: ${self:custom.propertyFromCustomSection}
```
* dynamic values, to be resolved by Step Functions from the workflow event: use the `$.` prefix inside the parameter value and the `.$` suffix inside the parameter name. Example:

```yaml
Parameters:
   ParameterBar.$: $.propertyFromEvent
```

5. In order to call `copyObject`, you're going to need the following parameters:
   1. `Bucket` - which is your destination bucket name (not ARN!) which you'll find in Serverless' `custom:` section.
   2. `CopySource` - which you'll have to pass from `calculateScore` Lambda 
      1. It's a concatenation of your input bucket name found in `config` and the object's `key`.
      2. You will have to extend the `ScanCvScoreEvent` interface.
   3. `Key` - which will be the new copied object's name. 
      1. Again, pass this value from `calculateScore` Lambda and add it to the `ScanCvScoreEvent` interface.
6. Make sure the new steps have `End: True` to finalise the workflow execution.

## Result
You have successfully deployed 2 additional S3 buckets. Your workflow uploads resume into correct buckets based on the
score.

## Graph
<img src="../data/task-5-result.png"/>

### Useful links
- [Choice step](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-choice-state.html)
- [Native integration with AWS API](https://docs.aws.amazon.com/step-functions/latest/dg/supported-services-awssdk.html)
- [Introduction to using native AWS integrations](https://aws.amazon.com/blogs/aws/now-aws-step-functions-supports-200-aws-services-to-enable-easier-workflow-automation/)
- [ENV variables](https://www.serverless.com/framework/docs/providers/aws/guide/variables#referencing-environment-variables)


### Native SDK integrations docs

To properly configure the Native integration step, you should look at the AWS SDK documentation for the specific AWS Service.

In example, for the integration with the S3 service, you will be looking for the AWS S3 SDK documentation, which is available here:

- [AWS S3 SDK Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

In this documentation, you should look at the desired SDK method, i.e. `getObject` and check the Parameters section. All required parameters should be stored inside the `Parameters` section inside the workflow.

- [AWS S3 SDK getObject Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property)

Example:
```yaml
  getObjectFromBucket:
    Type: Task
    Resource: arn:aws:states:::aws-sdk:s3:getObject
    Parameters:
      Bucket.$: $.bucketName
      Key.$: $.objectKey
```
