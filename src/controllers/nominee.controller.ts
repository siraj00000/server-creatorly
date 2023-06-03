import { NextFunction, Request, Response } from 'express';
import Nominee from '../models/nominee.model.js';

class NomineeController {
    public async createNominee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nomineeInfo = req.body;
            await Nominee.create(nomineeInfo);

            res.status(201).json({
                success: true,
                msg: 'Nominee created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }
    public async fetchNominees(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nominees = await Nominee.find();
            res.status(200).json({ success: true, data: nominees });
        } catch (error) {
            next(error);
        }
    }
}

export default new NomineeController