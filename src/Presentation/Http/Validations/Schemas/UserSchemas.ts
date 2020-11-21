import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeUserSchema = {
  name: Joi.string()
    .min(3)
    .max(25)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  surname: Joi.string()
    .min(3)
    .max(25)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
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
  passwordConfirmation: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({ language: { any: { allowOnly: 'must match password' } } }),
}