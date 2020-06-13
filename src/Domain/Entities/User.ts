class User {
    private id: number;
    
    private name: string;
    
    private surname: string;


    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }
}

export default User;