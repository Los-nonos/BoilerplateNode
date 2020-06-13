import StoreUserCommand from '../../../../Application/Commands/Command/Users/StoreUserCommand';

class StoreUserAdapter {
    public from(_body: any): StoreUserCommand {
        // validate with validation service and throw exceptions if request have errors

        return new StoreUserCommand('pepito', 'perez');
    }
}

export default StoreUserAdapter;