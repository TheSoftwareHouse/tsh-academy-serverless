# Task 3 - Parallel processing

## Where do we start?
In the previous task we implemented parallel processing with two Lambda functions for
calculating score in different technologies.

<img src="../data/task-3-a-result.png"/>

## Description
In this exercise we're going to implement two more Lambda functions which will score the candidate's resume. 

We're going to check the candidate's experience with Node.js but also check them against an exclude list of candidates who are not welcome in the recruitment process.

The new lambdas will be run in paralell to the already created `check-it-experience` and `check-cloud-experience`, which you may use as a guide.

1. Create two following Lambda functions:
   1. `check-node-experience`
   2. `check-exclude-list`
2. For return type of the Lambdas, see `ScanCvEvent` in `workflows/scan-cv-workflow/types.ts`.
3. Implement the rules below in the newly created Lambdas:
   1. `check-node-experience` Lambda should react to following words: `node.js`, `javascript`, `mocha`, `jest`, `chai`, `express`, `nest.js`, `typescript`
   2. `check-exclude-list` Lambda should exclude a person with name `janusz`, surname `kowalski`, city `chrzaszczyzewoszyce`.
   It means that combination of all three words should result in setting `isExcluded` to `true`.
   Please remember that for comparison purpose you should transform body of S3 object using `toString().toLowerCase()`
4. Reference the new lambdas in the parallel step `checkExperience` in `workflow.asl.yml`.
5. Make sure the newly created Lambda functions are registered in `serverless.yml` and referenced in the IAM role in `workflows/scan-cv-workflow/workflow.iam.yml`.
6. Add necessary log entries and verify if the workflow succeeds on test files.

## Result
You have built a parallel processing with multiple Lambda functions for
calculating score in different technologies.

## Graph
<img src="../data/task-3-result.png"/>

### Useful links
- [Calculating score](../workflows/scan-cv-workflow/utils.ts)
- [Parallel steps in Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-parallel-state.html)
