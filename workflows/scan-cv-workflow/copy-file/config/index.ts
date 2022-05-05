import Joi from "joi";
import { pipeline } from "ts-pipe-compose";

interface CopyFileLambdaEnvironmentVariables {
  inputBucketName: string;
}

const loadEnvs = (env: NodeJS.ProcessEnv) => ({
  inputBucketName: env.S3_INPUT_BUCKET_NAME,
});

const validateConfig = (config: ReturnType<typeof loadEnvs>): CopyFileLambdaEnvironmentVariables => {
  const schema = Joi.object().keys({
    inputBucketName: Joi.string().required(),
  });

  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const createConfig = pipeline(loadEnvs, validateConfig);
