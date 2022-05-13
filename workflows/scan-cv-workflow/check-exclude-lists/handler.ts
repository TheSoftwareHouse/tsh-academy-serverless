import { Context } from "aws-lambda";
import { ScanCvEvent } from "../types";
import { winstonLogger as logger } from "../../../shared/logger";
import { findOccurrences } from "../utils";
import S3 from "aws-sdk/clients/s3";
import { createConfig } from "./config";

const s3Client = new S3();
const config = createConfig(process.env);

interface ExcludedPerson {
  name: string;
  surname: string;
  city: string;
}

const EXCLUDED_PEOPLE: ExcludedPerson[] = [{
  name: "janusz",
  surname: "kowalski",
  city: "chrząszczyżewoszyce",
}];

async function checkIfExcluded(text: string, excludedList: ExcludedPerson[]) {
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

export const handle = async (event: ScanCvEvent, _context: Context) => {
  logger.info("Handling event: %o", event);

  const { Body: body } = await s3Client.getObject({
    Bucket: config.extractedFilesBucketName,
    Key: event.key,
  }).promise();

  const isExcluded: boolean = await checkIfExcluded(body!.toString().toLowerCase(), EXCLUDED_PEOPLE);

  logger.info(`Checked if person is excluded for ${event.key}`);
  return {
    ...event,
    isExcluded,
  };
};
