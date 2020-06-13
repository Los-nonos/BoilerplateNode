import { Request, Response } from "express";
import { HTTP_CODES } from '../../Enums/HttpCodes';
import { success } from '../../../../utils/customResponse';
import StoreUserAdapter from '../../Adapters/Users/StoreUserAdapter';
import StoreUserHandler from '../../../../Application/Commands/Handler/Users/StoreUserHandler';

class StoreUserAction {
    private adapter: StoreUserAdapter;
    private handler: StoreUserHandler
    constructor() {
        //inject dependencies and assigned to properties
    }

    public execute(req: Request, res: Response) {
        const command = this.adapter.from(req.body);

        this.handler.execute(command);

        return res.status(HTTP_CODES.CREATED).json(success([], 'StoreUserAction: User has been created successfully'));
    }
}

export default StoreUserAction;