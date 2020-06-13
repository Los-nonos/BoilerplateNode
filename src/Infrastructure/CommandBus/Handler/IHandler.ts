import ICommand from "../Command/ICommand";

interface IHandler {
    execute(command: ICommand): Promise<void>;
}

export default IHandler