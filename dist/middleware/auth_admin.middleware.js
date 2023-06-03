import User from '../models/user.model.js';
import { ErrorResponse } from '../utils/error_response.utils.js';
const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user?.id
        });
        if (user?.role !== '1')
            return next(new ErrorResponse(400, 'Admin resources are denied'));
        next();
    }
    catch (error) {
        next(error);
    }
};
export default authAdmin;
//# sourceMappingURL=auth_admin.middleware.js.map