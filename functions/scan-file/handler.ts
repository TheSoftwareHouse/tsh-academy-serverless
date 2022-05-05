import { Context, S3Event } from "aws-lambda";
import { SNS } from "aws-sdk";
import { winstonLogger } from "../../shared/logger";
import { createConfig } from "./config";

const config = createConfig(process.env);
const snsClient = new SNS();

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
};
