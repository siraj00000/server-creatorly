import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.js';

interface AuthenticatedRequest extends Request {
    user: IUser;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authorization required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('Invalid authorization');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error });
    }
};

export default authMiddleware;
