import StoreUserCommand from '../../../../Application/Commands/Command/Users/StoreUserCommand';
import {inject, injectable} from "inversify";
import {INTERFACES} from "../../../../Infrastructure/DI/interfaces.types";
import {ValidationService} from "../../Validations/Utils/ValidationService";
import {storeUserSchema} from "../../Validations/Schemas/UserSchemas";
import ValidationException from "../../../../Application/Exceptions/ValidationException";

@injectable()
class StoreUserAdapter {
  private validationService: ValidationService;
  constructor(@inject(INTERFACES.IValidator) validationService: ValidationService) {
    this.validationService = validationService;
  }

  public from(body: any): StoreUserCommand {
    const error = this.validationService.validate(body, storeUserSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validationService.validationResult(error.details)));
    }
    
    return new StoreUserCommand(body.name, body.surname, body.email, body.password);
  }
}

export default StoreUserAdapter;