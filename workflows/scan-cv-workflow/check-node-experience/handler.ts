import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { winstonLogger as logger } from "../../../shared/logger";
import S3 from "aws-sdk/clients/s3";
import { createConfig } from "./config";
import { calculateScore } from "../utils";

const KEYS_TO_SEARCH = ["node.js", "javascript", "mocha", "jest", "chai", "express", "nest.js", "typescript"];

const s3Client = new S3();
const config = createConfig(process.env);

export const handle = async (event: ScanCvEvent, _context: Context) => {
  logger.info("Handling event: %o", event);

  const { Body: body } = await s3Client.getObject({
    Bucket: config.extractedFilesBucketName,
    Key: event.key,
  }).promise();

  const nodeExperience = await calculateScore(body!.toString(), KEYS_TO_SEARCH);

  logger.info(`Node experience has been calculated for ${event.key}`);
  return {
    ...event,
    nodeExperience,
  };
};
