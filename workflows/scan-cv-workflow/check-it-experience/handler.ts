import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { winstonLogger as logger } from "../../../shared/logger";
import S3 from "aws-sdk/clients/s3";
import { CheckITExperienceLambdaEnvironmentVariables, createConfig } from "./config";
import { calculateScore } from "../utils";

const KEYS_TO_SEARCH = [
  "terraform",
  "kubernetes",
  "cypress",
  "mysql",
  "postgresql",
  "mongodb",
  "arangodb",
  "github",
  "docker",
  "ansible",
];

export const checkItExperience = async (
  event: ScanCvEvent,
  config: CheckITExperienceLambdaEnvironmentVariables,
  s3Client: S3,
) => {
  logger.info("Handling event: %o", event);

  const { Body: body } = await s3Client
    .getObject({
      Bucket: config.extractedFilesBucketName,
      Key: event.key,
    })
    .promise();

  const itExperience = await calculateScore(body!.toString(), KEYS_TO_SEARCH);

  logger.info(`IT experience has been calculated for ${event.key}`);
  return {
    ...event,
    itExperience,
  };
};

export const handle = async (event: ScanCvEvent, _context: Context) => {
  const config = createConfig(process.env);
  const s3Client = new S3();
  return checkItExperience(event, config, s3Client);
};
