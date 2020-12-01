import { HashManager } from "../../../src/Domain/Interfaces/Services/HashManager";
import { injectable } from "inversify";

@injectable()
class MockHashManager implements HashManager {
  public check(_value: string, _hashedValue: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public hashValue(value: string, _options?: any): Promise<string> {
    return Promise.resolve(value);
  }
}

export default MockHashManager;
