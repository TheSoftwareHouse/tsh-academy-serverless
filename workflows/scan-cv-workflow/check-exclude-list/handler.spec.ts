import { checkExcludeLists } from "./handler";
import { createMockProxy } from "../../../shared/tests";
import S3 from "aws-sdk/clients/s3";

describe("check check exclude lists", () => {
  it("should return isExcluded as a False", async () => {
    const fileContent =
      "Imię: JanNazwisko: KowalskiData urodzenia: 01-01-1992Miejsce zamieszkania: GliwiceDoswiadczenie:Firma 101-01-2010 - 01-01-2014Technologie i narzedzia: Node.js, Javascript, AWS, Terraform, Jest, PostgreSQL, Github,Docker, Google CloudFirma 201-01-2014 - 01-01-2016Technologie i narzedzia: Node.js, Javascript, Typescript, Azure, AWS StepFunctions, Mocha,Chai, Cypress, MySQL, MongoDB, Gitlab, Kubernetes, Ansible";

    const s3Mock = createMockProxy<S3>();
    const event = {
      key: "cv.pdf",
      extension: "pdf",
    };
    const config = { extractedFilesBucketName: "extracted-files" };
    s3Mock.getObject.mockReturnValue({
      // @ts-ignore
      promise: async () => ({ Body: fileContent }),
    });

    const result = await checkExcludeLists(event, config, s3Mock);

    expect(result).toEqual({
      key: "cv.pdf",
      isExcluded: false,
      extension: "pdf",
    });
  });

  it("should return isExcluded as a True", async () => {
    const fileContent =
      "Imię: januszNazwisko: KowalskiData urodzenia: 01-01-1992Miejsce zamieszkania: chrzaszczyzewoszyceDoswiadczenie:Firma 101-01-2010 - 01-01-2014Technologie i narzedzia: Node.js, Javascript, AWS, Terraform, Jest, PostgreSQL, Github,Docker, Google CloudFirma 201-01-2014 - 01-01-2016Technologie i narzedzia: Node.js, Javascript, Typescript, Azure, AWS StepFunctions, Mocha,Chai, Cypress, MySQL, MongoDB, Gitlab, Kubernetes, Ansible";

    const s3Mock = createMockProxy<S3>();
    const event = {
      key: "cv.pdf",
      extension: "pdf",
    };
    const config = { extractedFilesBucketName: "extracted-files" };
    s3Mock.getObject.mockReturnValue({
      // @ts-ignore
      promise: async () => ({ Body: fileContent }),
    });

    const result = await checkExcludeLists(event, config, s3Mock);

    expect(result).toEqual({
      key: "cv.pdf",
      isExcluded: true,
      extension: "pdf",
    });
  });
});
