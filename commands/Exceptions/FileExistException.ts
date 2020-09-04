export default class FileExistException extends Error {
    public constructor(message: string) {
        super(`File has already exist -> ${message}`);
    }
}