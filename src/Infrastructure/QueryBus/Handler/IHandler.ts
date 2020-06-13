import { IQuery } from '../Query/IQuery';
import { IResult } from '../Result/IResult';

interface IHandler {
    execute(query: IQuery): Promise<IResult>;
}

export default IHandler;