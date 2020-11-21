import User from "../Entities/User";

export interface IToken {
    getUser(): User;
    getHash(): string;
    updateHash(hash: string): void;
}