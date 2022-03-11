import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { winstonLogger as logger } from "../../../shared/logger";
import { createConfig } from "./config";

const config = createConfig(process.env);

export const handle = async (event: ScanCvEvent[], _context: Context) => {
  logger.info(`Handling event: ${JSON.stringify(event)}`);

  const singleEvent: Required<ScanCvEvent> = event.reduce((obj, currentValue) => {
    return {
      ...obj,
      ...currentValue,
    };
  }, {} as any);

  logger.info(`Score has been calculated for ${config.inputBucketName}/${singleEvent.key}`);
  return event;
};
