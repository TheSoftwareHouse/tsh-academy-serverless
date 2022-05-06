import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { winstonLogger as logger } from "../../../shared/logger";


export const handle = async (event: ScanCvEvent, _context: Context) => {
  logger.info("Handling event: %o", event);
  return event;
};
