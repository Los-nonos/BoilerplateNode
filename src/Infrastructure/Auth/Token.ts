import {IToken} from "../../Domain/ValueObjects/IToken";
import {Entity} from "typeorm";

@Entity('token_login')
class Token implements IToken {

}

export default Token;