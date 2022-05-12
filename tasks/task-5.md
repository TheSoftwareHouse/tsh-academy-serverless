# Task 5 - Filter candidate CV files

## Where do we start?
In the previous task, we implemented a lambda to calculate a score on top of the results from the parallel step.

<img src="../data/task-4-result.png"/>

Checkout onto branch `task/5` unless already there:
        
        git checkout task/5

## Description
In this exercise, you will have to create the final workflow. To achieve that, you need to implement the following steps:

* Create a `checkScore` step with a rule to filter out only candidates with a score greater than 100
* Add two steps to save matched and rejected CV files to separate buckets

Follow the steps below to implement the task successfully:

1. Open `workflows/scan-cv-workflow/workflow.asl.yml` file
2. Add new **choice** type step called `checkScore` with choice to select only `calculatedScore` greater than **100** using `NumericGreaterThan` type.

At this point, you should be able to filter out candidates in which we are interested.

To save the candidate CV in the proper bucket you should use `AWS SDK service integrations`.

3. Create a new type **task** step called `saveToMatchedBucket` using Resource `arn:aws:states:::aws-sdk:s3:copyObject`
4. Create a new type **task** step called `saveToRejectedBucket` using Resource `arn:aws:states:::aws-sdk:s3:copyObject`

To fill the Parameters property, use an event object to pass the data from the previous lambdas.

## Result
You have the final workflow containing filtering CV files to the matched and rejected buckets.

## Graph
<img src="../data/task-5-result.png"/>

### Useful links
- [AWS SDK service integrations](https://docs.aws.amazon.com/step-functions/latest/dg/supported-services-awssdk.html)
- [S3 SDK for Javascript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
