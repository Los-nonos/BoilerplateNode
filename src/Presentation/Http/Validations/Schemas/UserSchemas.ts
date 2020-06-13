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
}