import {INTERFACES} from "../../../../Infrastructure/DI/interfaces.types";
import {ValidationService} from "../../Validations/Utils/ValidationService";
import {inject, injectable} from "inversify";
import ValidationException from "../../../../Application/Exceptions/ValidationException";
import LoginQuery from "../../../../Application/Queries/Query/Auth/LoginQuery";

@injectable()
class LoginAdapter {
    private validator: ValidationService;

    public constructor(@inject(INTERFACES.IValidator) validator: ValidationService) {
        this.validator = validator;
    }

    public from(body: any): LoginQuery {
        const error = this.validator.validate(body, {});

        if (error) {
            throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
        }

        return new LoginQuery(
            body.email,
            body.password
        )
    }
}

export default LoginAdapter;