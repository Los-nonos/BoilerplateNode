export interface IHashManager {
    check(value: string, hashedValue: string): Promise<boolean>;
    hashValue(value: string, options: any): Promise<string>;
}