import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  JWT_SECRET: Joi.string().required(),
  IMP_KEY: Joi.string().required(),
  IMP_SECRET: Joi.string().required(),
});

export function validate(config: Record<string, any>) {
  const { error } = envSchema.validate(config, { allowUnknown: true });
  if (error) throw new Error(`환경변수 오류: ${error.message}`);
  return config;
}