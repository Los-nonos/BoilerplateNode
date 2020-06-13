import { IUserService } from "../../Domain/Interfaces/Services/IUserService";
import User from '../../Domain/Entities/User';

class UserService implements IUserService {
    public async persist(_user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}

export default UserService;