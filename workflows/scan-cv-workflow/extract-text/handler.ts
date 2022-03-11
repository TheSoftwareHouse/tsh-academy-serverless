import { Context } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import { createConfig } from "./config";
import { winstonLogger as logger } from "../../../shared/logger";
import { AnalyzeDocumentResponse } from "aws-sdk/clients/textract";

const s3Client = new S3();
const config = createConfig(process.env);

interface ExtractTextEvent {
  key: string;
  extension: string;
  taskresult: AnalyzeDocumentResponse;
}

const extractText = (event: AnalyzeDocumentResponse) => {
  return event.Blocks?.reduce((text, block) => {
    if (block.BlockType === "LINE") {
      text += block.Text;
    }
    return text;
  }, "");
}

export const handle = async (event: ExtractTextEvent, _context: Context) => {
  logger.info(`Handling event: %o`, event);

  const text = extractText(event.taskresult);

  await s3Client.putObject({
    Bucket: config.extractedFilesBucketName,
    Key: event.key,
    Body: text,
  }).promise();

  logger.info(`Text has been extracted from ${event.key}`);
  return {
    key: event.key,
    extension: event.extension,
  };
};
