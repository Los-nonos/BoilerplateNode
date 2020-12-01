import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const loginSchema = {
  email: Joi.string()
    .email()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
}