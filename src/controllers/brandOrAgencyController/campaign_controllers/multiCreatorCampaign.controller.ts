import { Request, Response, NextFunction } from 'express';
import { validateMimeType } from '../../../utils/validate_mimetype.utils.js';
import { ErrorResponse } from '../../../utils/error_response.utils.js';
import cloudinary from 'cloudinary';
import { removeTmp } from '../../../utils/remove_folde.utils.js';
import MultiCreatorCampaign from '../../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';

class MultiCreatorCampaignController {
    public async createCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let imageURL;
            if (req.file) {
                let isValidFile = validateMimeType(req.file.mimetype);
                if (!isValidFile) throw new ErrorResponse(400, 'Invalid image type');

                const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'campaign' });

                // remove temp file
                removeTmp(req.file.path);

                imageURL = result.secure_url;
            }

            const newCampaign = new MultiCreatorCampaign({
                campaign_image: {
                    url: imageURL
                },
                brand_id: req.user?._id,
                ...req.body
            });

            await newCampaign.save();

            res.status(201).json({
                success: true,
                message: 'Campaign created successfully',
                data: newCampaign
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaigns = await MultiCreatorCampaign.find();
            res.status(200).json({
                success: true,
                data: campaigns
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchCampaignById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaign = await MultiCreatorCampaign.findById(req.params.id);
            if (!campaign) {
                res.status(404).json({
                    success: false,
                    message: 'Campaign not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: campaign
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchCampaignsByBrandId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaigns = await MultiCreatorCampaign.find({ brand_id: req.user?._id }, '_id campaign_name campaign_image status budget start_date end_date');

            const ongoingCampaigns = campaigns.filter((campaign) => campaign.status === 'ongoing');
            const pendingCampaigns = campaigns.filter((campaign) => campaign.status === 'pending');
            const completedCampaigns = campaigns.filter((campaign) => campaign.status === 'completed');
            const deniedCampaigns = campaigns.filter((campaign) => campaign.status === 'denied');

            res.status(200).json({
                success: true,
                data: {
                    ongoingCampaigns,
                    pendingCampaigns,
                    completedCampaigns,
                    deniedCampaigns
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchCampaignsByCreatorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaigns = await MultiCreatorCampaign.find({ creators_id: { $elemMatch: { $eq: req.user?._id } } }, '_id campaign_name status budget start_date end_date');

            const ongoingCampaigns = campaigns.filter((campaign) => campaign.status === 'ongoing');
            const completedCampaigns = campaigns.filter((campaign) => campaign.status === 'completed');

            res.status(200).json({
                success: true,
                data: {
                    ongoingCampaigns,
                    completedCampaigns
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchPendingCampaigns(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pendingCampaigns = await MultiCreatorCampaign.find({ status: 'pending' }, '_id budget campaign_name campaign_image start_date end_date');

            if (!pendingCampaigns) {
                throw new ErrorResponse(400, 'There are currently no campaigns in the pending state.');
            }

            res.status(200).json({
                success: true,
                data: pendingCampaigns
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateCampaignbyId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaign = await MultiCreatorCampaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!campaign) {
                throw new ErrorResponse(404, 'Campaign not found');
            }
            res.status(200).json({
                success: true,
                message: 'Campaign updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteCampaignById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaign = await MultiCreatorCampaign.findByIdAndDelete(req.params.id);
            if (!campaign) {
                res.status(404).json({
                    success: false,
                    message: 'Campaign not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: campaign
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new MultiCreatorCampaignController();
