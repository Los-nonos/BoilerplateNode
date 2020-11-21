import StoreUserCommand from '../../../../Application/Commands/Command/Users/StoreUserCommand';
import {injectable} from "inversify";

@injectable()
class StoreUserAdapter {
  public from(body: any): StoreUserCommand {
    // validate with validation service and throw exceptions if request have errors

    return new StoreUserCommand(body.name, body.surname, body.email, body.password);
  }
}

export default StoreUserAdapter;