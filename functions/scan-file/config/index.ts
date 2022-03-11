import Joi from "joi";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: NodeJS.ProcessEnv) => ({
  appName: env.APP_NAME,
  scanFailedTopicArn: env.SNS_SCAN_FAILED_TOPIC_ARN,
  stateMachineArn: env.STATE_MACHINE_ARN,
});

const validateConfig = (config: ReturnType<typeof loadEnvs>) => {
  const schema = Joi.object().keys({
    appName: Joi.string().required(),
    scanFailedTopicArn: Joi.string().required(),
    stateMachineArn: Joi.string().required(),
  });

  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const createConfig = pipeline(loadEnvs, validateConfig);
