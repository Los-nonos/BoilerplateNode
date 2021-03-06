import {HashManager} from "../../../Domain/Interfaces/Services/HashManager";
import bcrypt from 'bcrypt';
import {injectable} from "inversify";

@injectable()
export default class BCryptHashProvider implements HashManager {
  public check(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }

  public hashValue(value: string, options: any = {rounds: Number(process.env.HASH_ROUNDS)}): Promise<string> {
    return bcrypt.hashSync(value, options.rounds);
  }

}