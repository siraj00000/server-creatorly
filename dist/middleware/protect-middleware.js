import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ErrorResponse } from '../utils/error_response.utils.js';
export const protectMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new ErrorResponse(401, 'Not authorized to access this route'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorResponse(404, 'No uses found with this id'));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new ErrorResponse(401, 'Not authorized to access this route'));
    }
};
//# sourceMappingURL=protect-middleware.js.map