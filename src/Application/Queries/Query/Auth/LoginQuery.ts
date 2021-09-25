import { Query } from "../../../../Domain/ValueObjects/Query";

class LoginQuery extends Query {
    private email: string;
    private password: string;

    public constructor(email: string, password: string) {
        super();
        this.email = email;
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }
}

export default LoginQuery;