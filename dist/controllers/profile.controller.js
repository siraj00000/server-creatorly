import User from '../models/user.model.js';
class ProfileController {
    async getProfile(req, res, next) {
        try {
            const user = await User.findById({ _id: req.user?.id }, { password: 0 });
            res.status(200).json({
                success: true,
                message: 'Profile data fetched',
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new ProfileController();
//# sourceMappingURL=profile.controller.js.map