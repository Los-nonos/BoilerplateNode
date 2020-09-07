class User {
    private id: number;
    
    private name: string;
    
    private surname: string;

    private email: string;

    private password: string;

    private emailHashVerified: boolean;

    public getId(): number {
        return this.id;
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

    public getEmail(): string {
        return this.email;
    }

    hashEmailVerified() {
        return this.emailHashVerified === true;
    }

    getPassword() {
        return this.password;
    }
}

export default User;