import ICommand from '../../../../Infrastructure/CommandBus/Command/ICommand';

class StoreUserCommand implements ICommand {
    private name: string;
    private surname: string;
    
    public constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }
}

export default StoreUserCommand;