# Task 3 - Parallel processing

## Where do we start?
In the previous task we established how we are going to extract data from a resume file.

<img src="../data/task-2-result.png"/>

## Description
In this exercise you are asked to create two Lambda functions responsible for searching experience in specific areas.
Implement following functions:
- check exclude list
- check node experience

The other two are already implemented (`check-it-experience` and `check-cloud-experience`). You may use them as a guide.

1. Add parallel step `checkExperience` in `workflow.asl.yml` file.
2. Create following lambda functions
   1. `check-node-experience`
   2. `check-exclude-list`
3. Please add rules defined below to newly created lambdas:
   1. `check-node-experience` lambda should react to following words: `node.js`, `javascript`, `mocha`, `jest`, `chai`, `express`, `nest.js`, `typescript`
   2. `check-exclude-list` lambda should exclude person with name `janusz`, surname `kowalski`, city `chrzaszczyzewoszyce`.
   It means that combination of all three words should be excluded.
   Please remember that for comparison purpose you should transform body of S3 object using `toString().toLowerCase()`
3. Register following lambda functions in `serverless.yml`
   1. `check-node-experience`
   2. `check-exclude-list`
4. Make sure that all four lambdas from this task are referenced in a parallel step in `workflow.asl.yml`.
Example of parallel step in YML:
```
exampleParallelStep:
    Type: Parallel
    End: true
    Branches:
      - StartAt: firstOfStepsUsingLambda
        States:
          firstOfStepsUsingLambda:
            Type: Task
            Resource: arnOfFirstOfStepsUsingLambda
            End: true
      - StartAt: secondOfStepsUsingLambda
        States:
          secondOfStepsUsingLambda:
            Type: Task
            Resource: arnOfSecondOfStepsUsingLambda
            End: true
```
5. Add necessary log entries and verify if workflow succeeds on test files.
6. Did something wrong happened during a deploy? How do you think, what's the issue? How can it be fixed?
7. After adding the fix rerun the deploy and check that workflow succeeds with test files.

## Result
You have built a parallel processing with multiple Lambda functions for
calculating score in different technologies.

## Graph
<img src="../data/task-3-result.png"/>

### Useful links
- [Calculating score](../workflows/scan-cv-workflow/utils.ts)
- [Parallel steps in Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-parallel-state.html)
