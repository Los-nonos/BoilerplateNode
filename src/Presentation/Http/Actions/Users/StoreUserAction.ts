import { Request, Response } from "express";
import { HTTP_CODES } from '../../Enums/HttpCodes';
import { success } from '../../../../utils/customResponse';
import StoreUserAdapter from '../../Adapters/Users/StoreUserAdapter';
import StoreUserHandler from '../../../../Application/Commands/Handler/Users/StoreUserHandler';
import {inject, injectable} from "inversify";

@injectable()
class StoreUserAction {
    private adapter: StoreUserAdapter;
    private handler: StoreUserHandler
    constructor(@inject(StoreUserAdapter) adapter: StoreUserAdapter, @inject(StoreUserHandler) handler: StoreUserHandler) {
        this.adapter = adapter;
        this.handler = handler;
    }

    public async execute(req: Request, res: Response) {
        const command = this.adapter.from(req.body);

        await this.handler.execute(command);

        return res.status(HTTP_CODES.CREATED).json(success(null, 'StoreUserAction: User has been created successfully'));
    }
}

export default StoreUserAction;