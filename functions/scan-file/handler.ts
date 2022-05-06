import { Context, S3Event } from "aws-lambda";
import { SNS, StepFunctions } from "aws-sdk";
import { v4 } from "uuid";
import { winstonLogger } from "../../shared/logger";
import { createConfig } from "./config";

const config = createConfig(process.env);
const snsClient = new SNS();
const sf = new StepFunctions();

export const handle = async (event: S3Event, _context: Context): Promise<any> => {
  winstonLogger.info(`Config: ${JSON.stringify(config)}`);

  const key = event.Records[0].s3.object.key;
  const extension = key.split(".").pop();

  if (["doc", "docx"].includes(extension!)) {
    winstonLogger.info(`Publishing failed file ${key} to topic ${config.scanFailedTopicArn}`);
    await snsClient.publish({
      Message: JSON.stringify({ key }),
      TopicArn: config.scanFailedTopicArn,
    });

    return;
  }

  winstonLogger.info("Starting SF execution");
  const executionName = key + v4();
  await sf
    .startExecution({
      stateMachineArn: config.stateMachineArn,
      input: JSON.stringify({ key, extension }),
      name: executionName,
    })
    .promise();
  winstonLogger.info(`SF execution started with name ${executionName}`);
};