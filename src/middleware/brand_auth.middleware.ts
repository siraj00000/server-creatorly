import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';
import { ErrorResponse } from '../utils/error_response.utils.js';

const brandOrAgencyAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({
            _id: req.user?.id
        });
        if (user?.role !== '3') return next(new ErrorResponse(400, 'Resources are denied'));

        next();
    } catch (error) {
        next(error);
    }
};

export default brandOrAgencyAuth;
