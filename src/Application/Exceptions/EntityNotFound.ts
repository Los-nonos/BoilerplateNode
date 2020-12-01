import ApplicationError from './ApplicationError';

export default class EntityNotFound extends ApplicationError {
  public constructor(message: string) {
    super(EntityNotFound.name, message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
