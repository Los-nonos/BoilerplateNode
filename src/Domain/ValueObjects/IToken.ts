export interface IToken {
    getUserId(): number;
    getHash(): string;
    setHash(hash: string): void;
}