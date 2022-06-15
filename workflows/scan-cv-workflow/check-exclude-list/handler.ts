import { ScanCvEvent } from "../types";
import S3 from "aws-sdk/clients/s3";
import { CheckExcludeListsLambdaEnvironmentVariables } from "./config";

export const checkExcludeLists = async (
  event: ScanCvEvent,
  config: CheckExcludeListsLambdaEnvironmentVariables,
  s3Client: S3,
) => {
  const isExcluded = false;

  return {
    ...event,
    isExcluded,
  };
};
