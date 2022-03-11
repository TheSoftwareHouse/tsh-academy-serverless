import { ScanCvEvent } from "../types";
import S3 from "aws-sdk/clients/s3";
import { Context } from "aws-lambda";
import { winstonLogger as logger } from "../../../shared/logger";
import { findOccurrences } from "../utils";
import { CheckExcludeListsLambdaEnvironmentVariables, createConfig} from "./config";

interface ExcludedPerson {
  name: string;
  surname: string;
  city: string;
}

const EXCLUDED_PEOPLE: ExcludedPerson[] = [{
  name: "janusz",
  surname: "kowalski",
  city: "chrzaszczyzewoszyce",
}];

const checkIfExcluded = async (text: string, excludedList: ExcludedPerson[]) => {
  let isExcluded = false;

  excludedList.forEach((person: ExcludedPerson) => {
    const nameOccurrence = findOccurrences(text, person.name) > 0;
    const surnameOccurrence = findOccurrences(text, person.surname) > 0;
    const cityOccurrence = findOccurrences(text, person.city) > 0;

    if (nameOccurrence && surnameOccurrence && cityOccurrence) {
      isExcluded = true;
    }
  });

  return isExcluded;
}

export const checkExcludeLists = async (
  event: ScanCvEvent,
  config: CheckExcludeListsLambdaEnvironmentVariables,
  s3Client: S3,
) => {
  logger.info("Handling event: %o", event);

  const { Body: body } = await s3Client
    .getObject({
      Bucket: config.extractedFilesBucketName,
      Key: event.key,
    })
    .promise();

  const isExcluded: boolean = await checkIfExcluded(body!.toString().toLowerCase(), EXCLUDED_PEOPLE);

  return {
    ...event,
    isExcluded,
  };
};

export const handle = async (event: ScanCvEvent, _context: Context) => {
  const config = createConfig(process.env);
  const s3Client = new S3();
  return checkExcludeLists(event, config, s3Client);
};
