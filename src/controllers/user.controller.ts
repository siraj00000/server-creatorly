import User, { IUser } from '../models/user.model.js';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils/error_response.utils.js';
import CreatorOnlinePresence from '../models/creatorModels/creatorOnlinePresence.model.js';
import BrandOnlinePresence from '../models/brandOrAgencyModels/brandOrAgencyOnlinePresence.model.js';
import { sendEmail } from '../utils/send_email.utils.js';
import crypto from 'crypto';
import Visitor, { IVisitor } from '../models/creatorModels/visitor.model.js';

class UserController {
    public async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) return next(new ErrorResponse(401, 'Please provide email and password.'));

            const user = await User.findOne({ email }).select('+password');

            if (!user) return next(new ErrorResponse(401, 'Invalid Credentials.'));

            const isMatch = await user.matchPassword(password);
            if (!isMatch) return next(new ErrorResponse(401, 'Invalid Password.'));

            const token = user.generateAuthToken();

            let userRoute;
            if (user.userType === 'creator') {
                const creatorOnlinePresence = await CreatorOnlinePresence.where({ user: user._id }).findOne();

                if (creatorOnlinePresence) {
                    userRoute = '/dashboard';
                } else {
                    userRoute = '/onboarding';
                }
            } else if (user.userType === 'brand/agency') {
                const brandOrAgencyOnlinePresence = await BrandOnlinePresence.where({ user: user._id }).findOne();

                if (brandOrAgencyOnlinePresence) {
                    userRoute = '/dashboard';
                } else {
                    userRoute = '/onboarding';
                }
            } else if (user.userType === 'admin') {
                userRoute = '/dashboard';
            }

            res.status(200).json({ success: true, token, user, userRoute });
        } catch (error) {
            next(error);
        }
    }
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _userInfo = req.body;
            if (_userInfo.userType === 'brand/agency') {
                _userInfo.role = '3';
            }

            let user = (await User.create(_userInfo)) as IUser;

            const token = user.generateAuthToken();

            // Update visitor registration status if visitor exists and user is a creator
            if (_userInfo.userType === 'creator') {
                const visitor: IVisitor | null = await Visitor.findOne({ instagramLink: _userInfo.instagramLink });
                if (visitor) {
                    visitor.registered = true;
                    await visitor.save();
                }
            }

            res.status(201).json({
                success: true,
                msg: 'User Registered!',
                token,
                user
            });
        } catch (error: any) {
            next(error);
        }
    }
    public async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email, userType: { $ne: 1 } });

            if (!user) {
                return next(new ErrorResponse(404, 'User not found'));
            }

            const resetToken = user.getResetPasswordToken();

            await user.save();

            const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

            const message = `
                <h1>You have requested a password reset</h1>
                <p>Please go to this link to reset password</p>
                <a href=${resetUrl}>${resetUrl}</a>
            `;

            try {
                await sendEmail(user.email, 'Password Reset Request', message);

                res.status(200).json({
                    success: true,
                    data: 'Email Sent'
                });
            } catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save();

                return next(new ErrorResponse(500, 'Email could not be sent'));
            }
        } catch (error) {
            next(error);
        }
    }
    public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        try {
            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });

            if (!user) {
                return next(new ErrorResponse(400, 'Invalid Reset Token'));
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            res.status(200).json({
                success: true,
                data: 'Password Reset Success',
                token: user.generateAuthToken()
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
