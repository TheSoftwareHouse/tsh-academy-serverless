import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { createConfig } from "./config";
import { winstonLogger as logger } from "../../../shared/logger";

const config = createConfig(process.env);

export const handle = async (event: ScanCvEvent, _context: Context) => {
  logger.info("Handling event: %o", event);
  logger.info(`Trying to move file ${event.key} from bucket ${config.inputBucketName}`);
  return event;
};
