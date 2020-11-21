import {IToken} from "../../Domain/ValueObjects/IToken";
import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "../../Domain/Entities/User";

@Entity('token_login')
class Token implements IToken {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public hash: string;

  @OneToOne(() => User)
  public user: User;

  public constructor(hash: string, user: User) {
    this.hash = hash;
    this.user = user;
  }


  public getHash(): string {
    return this.hash;
  }

  public getUser(): User {
    return this.user;
  }

  public updateHash(hash: string): void {
    this.hash = hash;
  }

}

export default Token;