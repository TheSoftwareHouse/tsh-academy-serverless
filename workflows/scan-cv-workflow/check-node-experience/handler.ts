import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { winstonLogger as logger } from "../../../shared/logger";
import S3 from "aws-sdk/clients/s3";
import { CheckNodeExperienceLambdaEnvironmentVariables, createConfig } from "./config";
import { calculateScore } from "../utils";

const KEYS_TO_SEARCH = [
  "node.js",
  "javascript",
  "mocha",
  "jest",
  "chai",
  "express",
  "nest.js",
  "typescript",
];

export const checkNodeExperience = async (
  event: ScanCvEvent,
  config: CheckNodeExperienceLambdaEnvironmentVariables,
  s3Client: S3,
) => {
  logger.info("Handling event: %o", event);

  const { Body: body } = await s3Client
    .getObject({
      Bucket: config.extractedFilesBucketName,
      Key: event.key,
    })
    .promise();

  const nodeExperience = await calculateScore(body!.toString(), KEYS_TO_SEARCH);

  logger.info(`Node experience has been calculated for ${event.key}`);
  return {
    ...event,
    nodeExperience,
  };
};

export const handle = async (event: ScanCvEvent, _context: Context) => {
  const config = createConfig(process.env);
  const s3Client = new S3();
  return checkNodeExperience(event, config, s3Client);
};
