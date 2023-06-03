import { Request, Response, NextFunction } from 'express';
import User from '../../models/user.model.js';

class DiscoverCreatorsController {
    public async discoverCreator(req: Request, res: Response, next: NextFunction) {
        try {
            let { username } = req.query;
            let pipeline = [
                {
                    $match: {
                        userType: 'creator',
                        userName: {
                            $regex: username,
                            $options: 'i'
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'userprofiles',
                        localField: '_id',
                        foreignField: 'user_id',
                        as: 'userProfile'
                    }
                },
                {
                    $lookup: {
                        from: 'creatoronlinepresences',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'userOnlinePresence'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        userName: 1,
                        region: '$userProfile.region',
                        profile_image_url: '$userProfile.profile_image_url',
                        category: '$userOnlinePresence.category'
                    }
                }
            ];

            const data = await User.aggregate(pipeline);

            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new DiscoverCreatorsController();
