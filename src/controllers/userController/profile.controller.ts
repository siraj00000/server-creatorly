import { NextFunction, Request, Response } from 'express';
import cloudinary from 'cloudinary';
import User from '../../models/user.model.js';
import { ErrorResponse } from '../../utils/error_response.utils.js';
import { validateMimeType } from '../../utils/validate_mimetype.utils.js';
import { removeTmp } from '../../utils/remove_folde.utils.js';
import UserProfile from '../../models/user/userProfile.model.js';
import CreatorOnlinePresence, { ICreatorOnlinePresence } from '../../models/creatorModels/creatorOnlinePresence.model.js';

class ProfileController {
    public async createOrUpdateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            req.body['languages'] = JSON.parse(req.body.languages);
            req.body['category'] = JSON.parse(req.body.category);

            let result;
            if (req.file) {
                let isValidFile = validateMimeType(req.file?.mimetype);
                if (!isValidFile) throw new ErrorResponse(400, 'Invalid image type');

                result = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'profile' });

                // remove temp file
                removeTmp(req.file.path);
            }

            if (req.body.userName) {
                await User.findByIdAndUpdate(req.user?.id, { userName: req.body.userName }, { new: true });
            }

            const userProfile = await UserProfile.findOneAndUpdate(
                { user_id: req.user?.id },
                {
                    ...req.body,
                    profile_image_url: result?.secure_url || ''
                },
                { new: true }
            );

            if (userProfile) {
                res.status(200).json({
                    success: true,
                    message: 'Profile updated successfully',
                    data: userProfile
                });
            } else {
                const newProfile = await UserProfile.create({
                    user_id: req.user?.id,
                    ...req.body,
                    profile_image_url: result?.secure_url || ''
                });

                res.status(201).json({
                    success: true,
                    message: 'Profile updated successfully',
                    data: newProfile
                });
            }
        } catch (error) {
            console.log(error);

            next(error);
        }
    }

    public async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let result;
            if (req.file) {
                let isValidFile = validateMimeType(req.file?.mimetype);
                if (!isValidFile) throw new ErrorResponse(400, 'Invalid image type');

                result = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'profile' });

                // remove temp file
                removeTmp(req.file.path);
            }

            const profile = await UserProfile.create({
                user_id: req.user?.id,
                date_of_birth: req.body.date_of_birth,
                languages: req.body.languages,
                gender: req.body.gender,
                category: req.body.category,
                region: req.body.region,
                about: req.body.about,
                contact_email: req.body.contact_email,
                profile_image_url: result?.secure_url // Updated to use Cloudinary response for image URL
            });

            res.status(201).json({
                success: true,
                data: profile
            });
        } catch (error) {
            next(error);
        }
    }

    public async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            let userProfile, loggedInUser;

            // Fetch user profile data from UserProfile model
            userProfile = await UserProfile.findOne({ user_id: req.user?.id });

            // Fetch logged-in user data from User model, excluding password and role
            loggedInUser = await User.findById(req.user?.id, { password: 0, role: 0 });

            // Initialize userProfile and loggedInUser to null if falsy
            userProfile = userProfile || null;
            loggedInUser = loggedInUser || null;

            // Send response with fetched data
            res.status(200).json({
                success: true,
                message: 'Profile data fetched',
                data: { userProfile, loggedInUser }
            });
        } catch (error) {
            next(error);
        }
    }

    public async filterProfiles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const category: string[] = req.body.category;
            const region: string[] = req.body.region;

            const pipeline = [
                { $match: { $and: [{ category: { $elemMatch: { $in: category } } }, { region: { $in: region } }] } },
                {
                    $lookup: {
                        from: 'users',
                        let: { userId: '$user_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$_id', '$$userId']
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    userName: 1
                                }
                            }
                        ],
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user.userName',
                        foreignField: 'userName',
                        as: 'user'
                    }
                },
                {
                    $match: {
                        'user.userName': {
                            $regex: req.query.userName,
                            $options: 'i'
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userProfile: '$$ROOT'
                    }
                }
            ];

            const result = await UserProfile.aggregate(pipeline);

            res.status(200).json({
                success: true,
                message: 'Filtered profiles fetched',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    public async getProfileByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id } = req.params;
            if (!user_id) {
                throw new ErrorResponse(400, 'No user found');
            }

            const getUserName = await User.findById({ _id: user_id }, 'userName phoneNumber');
            const profile = await UserProfile.findOne({ user_id });
            const creatorOnlinePressence = await CreatorOnlinePresence.findOne({ user: user_id });

            res.status(200).json({
                success: true,
                message: 'Profile fetched',
                data: { getUserName, profile, creatorOnlinePressence }
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userProfile = await UserProfile.findByIdAndUpdate(req.user?.id, req.body, { new: true });
            if (!userProfile) {
                throw new ErrorResponse(404, 'Profile data not found');
            }
            res.status(200).json({
                success: true,
                message: 'Profile data updated',
                data: userProfile
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userProfile = await UserProfile.findByIdAndDelete(req.user?.id);
            if (!userProfile) {
                throw new ErrorResponse(404, 'Profile data not found');
            }
            res.status(200).json({
                success: true,
                message: 'Profile data deleted',
                data: userProfile
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new ProfileController();
