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

### How to set up
- copy `.env.dist` file to `.env` by running `cp .env.dist .env` and fill up variables
- install dependencies by running `npm install`
- configure default profile for executing AWS CLI commands by running `aws configure` and following along

### Code generation
Our boilerplate supports code generation. Here is a command to execute: ```npm run plop```

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
