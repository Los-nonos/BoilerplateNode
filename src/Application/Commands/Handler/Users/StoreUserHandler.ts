import StoreUserCommand from '../../Command/Users/StoreUserCommand';
import IHandler from '../../../../Infrastructure/CommandBus/Handler/IHandler';

class StoreUserHandler implements IHandler {
    public execute(_command: StoreUserCommand): Promise<void> {
        throw new Error('Method not implemented');
    }
}

export default StoreUserHandler;