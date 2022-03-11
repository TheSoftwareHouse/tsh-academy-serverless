# Task 2 - Add missing workflow parts

## Where do we start?
In the previous task we started a workflow and handled rejection of CV based on file extension.

## Description
In this exercise you are asked to fill in missing steps in workflow based on already implemented lambdas.
We expect to achieve the following workflow after this task:

<img src="../data/task-2-result.png"/>

You are going to work in `/workflows/scan-cv-workflow/workflow.asl.yml` file.

You will find all needed lambdas in `/workflows/scan-cv-workflow/` directory.

1. Add `extractText` step to `workflow.asl.yml` (it should use `extractText-lambda`)
2. Add `copyFileToExtractedBucket` step to `workflow.asl.yml` (it should use `copyFile-lambda`)
3. Add `checkFileType` step to `workflow.asl.yml`.
   It should go to `copyFileToExtractedBucket` step if extension of file provided is `txt`.
   Otherwise, it should go to `extractData` step (extension is sent as variable from `scan-file` lambda). This step should be of **Choice** type.
5. Connect `extractData` step so it sends result to `extractText` step.
6. Remember to end workflow on every possible last step.
7. Add necessary log entries and verify if workflow succeeds on test files.

## Result
You have added steps to workflow handling CV file analysis and parsing.

### Useful links
- [Choice step in Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-choice-state.html)
- [Transitions in Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-transitions.html)
