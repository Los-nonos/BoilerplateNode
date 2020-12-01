import { Request, Response, NextFunction } from 'express';
import { INTERFACES } from '../DI/interfaces.types';
import { LoggerService } from '../../Domain/Interfaces/Services/LoggerService';
import { LogLevels } from '../../Domain/Enums/LogLevels';
import DIContainer from '../DI/di.config';
import { HTTP_CODES } from '../../Presentation/Http/Enums/HttpCodes';
import { codeErrors } from '../../Presentation/Http/Validations/Utils/ErrorMessages';
import EntityNotFoundException from '../../Application/Exceptions/EntityNotFound';
import NotFoundException from '../../Presentation/Http/Exceptions/NotFountException';
import InternalErrorException from '../../Presentation/Http/Exceptions/InternalErrorException';
import UnprocessableEntityException from '../../Presentation/Http/Exceptions/UnprocessableEntityException';
import BadRequestException from '../../Presentation/Http/Exceptions/BadRequestException';
import { error } from '../../utils/customResponse';


export const logErrors = (e: any, _request: Request, _response: Response, next: NextFunction) => {
    const logger = DIContainer.get<LoggerService>(INTERFACES.ILoggerService);
    logger.log(LogLevels.ERROR, e.stack);
    return next(e);
}

export const mapApplicationToHTTPErrors = async (
    e: any,
    _request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    switch (e.constructor) {
      case EntityNotFoundException:
        e = new NotFoundException(
          e.message,
          HTTP_CODES.NOT_FOUND,
          codeErrors.HTTP.NOT_FOUND.code,
          codeErrors.HTTP.NOT_FOUND.href,
        );
        return next(e);
      default:
        e = new InternalErrorException(
            e.message,
            HTTP_CODES.INTERNAL_ERROR,
            codeErrors.HTTP.INTERNAL_ERROR.code,
            codeErrors.HTTP.INTERNAL_ERROR.href,
            );
        return next(e);
    }
}

export const execute = async (e: any, _request: Request, response: Response, _next: NextFunction) => {
  if (e instanceof BadRequestException || e instanceof UnprocessableEntityException) {
    return response.status(e.status).json(error(e.name, JSON.parse(e.message), e.type, e.href));
  }

  return response.status(e.status).json(error(e.name, e.message, e.type, e.href));
};
