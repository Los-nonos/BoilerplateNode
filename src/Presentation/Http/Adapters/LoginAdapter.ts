import {INTERFACES} from "../../../Infrastructure/DI/interfaces.types";
import IValidator from "../Validations/Utils/IValidationService";
import {inject} from "inversify";
import ValidationException from "../../../Application/Exceptions/ValidationException";
import LoginCommand from "../../../Application/Commands/Command/Auth/LoginCommand";

class LoginAdapter {
    private validator: IValidator;

    public constructor(@inject(INTERFACES.IValidator) validator: IValidator) {
        this.validator = validator;
    }

    public from(body: any): LoginCommand {
        const error = this.validator.validate(body, {});

        if (error) {
            throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
        }

        return new LoginCommand(
            body.email,
            body.password
        )
    }
}

export default LoginAdapter;