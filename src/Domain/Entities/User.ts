import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import EmailNotVerified from "../../Application/Exceptions/EmailNotVerified";
import EmailAlreadyVerified from "../../Application/Exceptions/EmailAlreadyVerified";
import { AggregateRoot } from "../ValueObjects/AggregateRoot";

@Entity('users')
class User extends AggregateRoot {    
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private surname: string;

    @Column()
    private readonly email: string;

    @Column()
    private password: string;

    @Column()
    private emailHashVerified: boolean;

    private role: string;

    constructor(name: string, surname: string, email: string, hashedPassword: string) {
        super();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = hashedPassword;
        this.emailHashVerified = false;
    }

    public getId(): number {
        return this.id;
    }

    public changeName(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public getRole(): string {
        return '';
    }

    public haveRole(role: string) {
        return this.role === role;
    }

    public getEmail(): string {
        return this.email;
    }

    public hashEmailVerified() {
        return this.emailHashVerified === true;
    }

    public getPassword() {
        return this.password;
    }

    public changePassword(password: string) {
        if (!this.emailHashVerified) {
            throw new EmailNotVerified();
        }

        this.password = password;
    }

    public verifyEmail() {
        if (this.emailHashVerified) {
            throw new EmailAlreadyVerified();
        }
        this.emailHashVerified = true;
    }

    public toPrimitives() {
        return {
            id: this.id,
            name: this.name,
        };
    }

}

export default User;