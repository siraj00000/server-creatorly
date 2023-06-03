import { Request, Response, NextFunction } from 'express';
import Visitor, { IVisitor } from '../../models/creatorModels/visitor.model.js';

class VisitorController {
    public async addVisitor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { instagramLink } = req.body;

            const visitor: IVisitor = await Visitor.create({
                instagramLink,
                registered: false
            });

            res.status(201).json({
                success: true,
                message: 'Visitor added successfully',
                data: visitor
            });
        } catch (error: any) {
            next(error);
        }
    }
    public async getNotRegisteredVisitors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notRegisteredVisitors: IVisitor[] = await Visitor.find({ registered: false });

            res.status(200).json({
                success: true,
                message: 'Not registered visitors fetched successfully',
                notRegisteredVisitors
            });
        } catch (error: any) {
            next(error);
        }
    }
}

export default new VisitorController();
