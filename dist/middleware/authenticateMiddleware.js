import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authorization required');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('Invalid authorization');
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
};
export default authMiddleware;
//# sourceMappingURL=authenticateMiddleware.js.map