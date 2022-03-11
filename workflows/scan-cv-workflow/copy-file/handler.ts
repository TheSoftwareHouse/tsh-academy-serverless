import { Context } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import { ScanCvEvent } from "../types";
import { createConfig } from "./config";
import { winstonLogger as logger } from "../../../shared/logger";

const s3Client = new S3();
const config = createConfig(process.env);

export const handle = async (event: ScanCvEvent, _context: Context) => {
  logger.info("Handling event: %o", event);

  await s3Client
    .copyObject({
      Bucket: config.extractedFilesBucketName,
      CopySource: `${config.inputBucketName}/${event.key}`,
      Key: event.key,
    })
    .promise();

  logger.info(`File ${event.key} has been duplicated from input bucket to extracted files bucket`);
  return event;
};
