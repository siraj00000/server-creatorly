import { NextFunction, Request, Response } from 'express';
import BrandOrAgencyOnlinePresence, { IBrandOnlinePresence } from '../../models/brandOrAgencyModels/brandOrAgencyOnlinePresence.model.js';

class BrandOrAgencyOnlinePresenceController {
    public async createBrandOrAgencyOnlinePresence(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, websiteLink } = req.body;

            const brandOrAgencyOnlinePresence = new BrandOrAgencyOnlinePresence({
                category,
                websiteLink,
                user: req.user?._id
            });

            await brandOrAgencyOnlinePresence.save();

            res.status(201).json({
                success: true,
                message: 'Social link for brand/agency created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchBrandOrAgencyOnlinePresence(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const brandOrAgencyOnlinePresence = await BrandOrAgencyOnlinePresence.find();
            res.status(200).json({ success: true, data: brandOrAgencyOnlinePresence });
        } catch (error) {
            next(error);
        }
    }

    public async updateBrandOrAgencyOnlinePresence(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const socialLinkId = req.params.id;
            const updatedOnlinePresenceInfo: IBrandOnlinePresence = req.body;

            await BrandOrAgencyOnlinePresence.findByIdAndUpdate(socialLinkId, updatedOnlinePresenceInfo);

            res.status(200).json({
                success: true,
                msg: 'Social link for brand/agency updated successfully!'
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteBrandOrAgencyOnlinePresence(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const socialLinkId = req.params.id;

            await BrandOrAgencyOnlinePresence.findByIdAndDelete(socialLinkId);

            res.status(200).json({
                success: true,
                msg: 'Social link for brand/agency deleted successfully!'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new BrandOrAgencyOnlinePresenceController();
