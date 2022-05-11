# TSH Academy - Serverless Workshops
Greetings!
Welcome to TSH Academy workshops. This repository contains the code necessary for following along with presentation.
If by any chance you get lost, we have prepared separate branches with every task, so you can verify your solution or start over.

## What you'll learn
The goal of today's workshop is to learn what Step Function are and how they work. We're going to show you how to define
state machines and develop business flows by orchestrating Lambda functions into both simple and complex processes.

## Serverless Framework - Development flow
During the workshop, we are going to show you how to effectively work with Serverless Framework and use it to deploy CloudFormation
stack. We're going to present some methods of development and how it differs from container based development.

### Requirements:
To follow along with the presentation please make sure to have installed:
- brew
- node.js
- npm
- git
- AWS CLI
- AWS Toolkit
- VS Code

**Resources:**
- Brew - https://brew.sh/
- AWS CLI - docs https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- AWS CLI - Brew https://formulae.brew.sh/formula/awscli
- Node.js - Brew https://formulae.brew.sh/formula/node
- VS Code - https://code.visualstudio.com/
- AWS Toolkit for VS Code - https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/setup-toolkit.html

### Code generation
Our boilerplate supports code generation. Here is a command to execute: ```npm run plop```

### How to set up
- checkout onto branch `task/1`: `git checkout task/1`
- install dependencies by running `npm install`
- after you've received a `credentials.csv` from us (if you haven't, scream out loud!) use its contents to:
  - configure a new profile for executing AWS CLI commands by running `aws configure --profile tsh-workshops` and entering the following it the prompt:
    - AWS Access Key ID: `<the Access key ID>`
    - AWS Secret Access Key: `<the "Secret access key">`
    - Default region name: `eu-west-1`
    - Default output format: the default `None` is fine, just press `Enter`
  - set environment variables:
    - run `cp .env.dist .env` 
    - fill in `STUDENT_NAME`: `STUDENT_NAME=<the "User name" from the credentials file>`
    - fill in `ACCOUNT_ID`: `ACCOUNT_ID=<the one provided by us (if we haven't, scream out loud!)>`
  - deploy the whole application stack by running `npx sls deploy --aws-profile=tsh-workshops` .
When deployed successfully, you will see the deployed step function in [AWS Console](https://eu-west-1.console.aws.amazon.com/states/home?region=eu-west-1#/statemachines) (look for one with your username in it).
- with the environment set up, you can proceed to [your first task](tasks/task-1.md)!


### **About us:**

<p align="center">
  <a href="https://tsh.io/pl"><b>The Software House</b></a>
  &emsp;
  <img src="data/tsh.png" alt="tsh.png" width="50" />
</p>

##

### License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/serverless-boilerplate/main/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).
