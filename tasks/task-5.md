# Task 5 - Native Integrations

## Where do we start?
In the previous task we have checked calculated total score of candidate resume.

<img src="../data/task-4-result.png"/>

## Description
In this exercise you are asked to store resume in different S3 buckets. One for accepted and one for rejected resumes.

1. Add S3 bucket definition for `matchedFilesBucket` in `serverless.yml` file (use e.g. inputBucket as an example).
2. Add S3 bucket definition for `rejectedFilesBucket` in `serverless.yml` file (use e.g. inputBucket as an example).
3. Add new step `checkScore` in `workflow.asl.yml` file.
   1. It should be `Choice` step.
   2. It should save file to `matchedFilesBucket` when calculated score is greater than 100.
   3. By default, it should save file to `rejectedFilesBucket`.
4. Make sure steps uploading file have `End: True` to finalise workflow execution.
5. Add ENV variable with `matchedBucket` name the `calculateScore` Lambda. It should be added in `function.yml`.
6. Add ENV variable with `rejectedBucket` name the `calculateScore` Lambda. It should be added in `function.yml`.
7. Fill `matchedFilesBucketName` and `rejectedFilesBucketName` in `calculateScore` Lambda.


**Variables to be added in calculate score lambda definition**
```dotenv
S3_MATCHED_FILES_BUCKET_NAME: tsh-academy-serverless-workshops-matched-files-${env:STUDENT_NAME, 'student01'}
S3_REJECTED_FILES_BUCKET_NAME: tsh-academy-serverless-workshops-rejected-files-${env:STUDENT_NAME, 'student01'}
```

**Passsing parameters**

To pass parameters to the native SDK integration from the workflow event, use the `$.` prefix inside the parameter value and the `.$` suffix inside the parameter name. Example:

```yaml
Parameters:
   ParameterName.$: $.propertyFromEvent
```
## Result
You have successfully deployed 2 additional S3 buckets. Your workflow uploads resume into correct buckets based on the
score.

## Graph
<img src="../data/task-5-result.png"/>

### Useful links
- [Choice step](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-choice-state.html)
- [Native integration with AWS API](https://docs.aws.amazon.com/step-functions/latest/dg/supported-services-awssdk.html)
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
