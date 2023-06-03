import User from '../models/user.model.js';
import { ErrorResponse } from '../utils/error_response.utils.js';
const creatorAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user?.id
        });
        if (user?.role !== '2')
            return next(new ErrorResponse(400, 'Resources are denied'));
        next();
    }
    catch (error) {
        next(error);
    }
};
export default creatorAuth;
//# sourceMappingURL=create_auth.middleware.js.map