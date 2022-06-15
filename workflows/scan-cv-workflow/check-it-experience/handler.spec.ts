import { checkItExperience } from "./handler";
import { createMockProxy } from "../../../shared/tests";
import S3 from "aws-sdk/clients/s3";

const fileContent =
  "Imię: JanNazwisko: KowalskiData urodzenia: 01-01-1992Miejsce zamieszkania: GliwiceDoswiadczenie:Firma 101-01-2010 - 01-01-2014Technologie i narzedzia: Node.js, Javascript, AWS, Terraform, Jest, PostgreSQL, Github,Docker, Google CloudFirma 201-01-2014 - 01-01-2016Technologie i narzedzia: Node.js, Javascript, Typescript, Azure, AWS StepFunctions, Mocha,Chai, Cypress, MySQL, MongoDB, Gitlab, Kubernetes, Ansible";

describe("check it experience", () => {
  it("should return it experience", async () => {
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

    const result = await checkItExperience(event, config, s3Mock);

    expect(result).toEqual({
      key: "cv.pdf",
      itExperience: 45,
      extension: "pdf",
    });
  });
});
