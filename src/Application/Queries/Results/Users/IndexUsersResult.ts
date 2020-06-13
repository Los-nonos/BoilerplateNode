import { IResult } from '../../../../Infrastructure/QueryBus/Result/IResult';
import User from '../../../../Domain/Entities/User';

class IndexUsersResult implements IResult {
    private users: any;
    
    setData(data: any): void {
        this.users = data;
    }
    getData(): User[] {
        return this.users;
    }
    
}

export default IndexUsersResult;