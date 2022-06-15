import { ScanCvEvent } from "../types";
import S3 from "aws-sdk/clients/s3";

export const checkNodeExperience = async (
  event: ScanCvEvent,
  config: CheckNodeExperienceLambdaEnvironmentVariables,
  s3Client: S3,
) => {
  const nodeExperience = 0;

  return {
    ...event,
    nodeExperience,
  };
};
