import { Command } from '../../../../Domain/ValueObjects/Command';

class StoreUserCommand implements Command {
  private name: string;
  private surname: string;
  private email: string;
  private password: string;

  public constructor(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

  public getName(): string {
    return this.name;
  }

  public getSurname(): string {
    return this.surname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}

export default StoreUserCommand;