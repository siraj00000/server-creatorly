import { Request, Response, NextFunction } from 'express';
import Campaign from '../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
import cloudinary from 'cloudinary';
import { ErrorResponse } from '../../utils/error_response.utils.js';
import { removeTmp } from '../../utils/remove_folde.utils.js';
import { validateMimeType } from '../../utils/validate_mimetype.utils.js';
import SingleCampaign from '../../models/brandOrAgencyModels/campaign_model/singleCreatorCampaign.js';

class CampaignController {
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

            const newCampaign = new Campaign({
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

    public async createSingleCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let imageURL;
            if (req.file) {
                let isValidFile = validateMimeType(req.file.mimetype);
                if (!isValidFile) throw new ErrorResponse(400, 'Invalid image type');

                const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'single-campaign' });

                // remove temp file
                removeTmp(req.file.path);

                imageURL = result.secure_url;
            }

            const newCampaign = new SingleCampaign({
                campaign_image: {
                    url: imageURL
                },
                brand_id: req.user?._id,
                ...req.body
            });

            await newCampaign.save();

            res.status(201).json({
                success: true,
                message: 'Campaign with this creator has been created successfully',
                data: newCampaign
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const campaigns = await Campaign.find();
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
            const campaign = await Campaign.findById(req.params.id);
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
            const campaigns = await Campaign.find({ brand_id: req.user?._id }, '_id campaign_name campaign_image status budget start_date end_date');

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
            const campaigns = await Campaign.find({ creators_id: { $elemMatch: { $eq: req.user?._id } } }, '_id campaign_name status budget start_date end_date');

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
            const pendingCampaigns = await Campaign.find({ status: 'pending' }, '_id budget campaign_name campaign_image start_date end_date');

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
            const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!campaign) {
                res.status(404).json({
                    success: false,
                    message: 'Campaign not found'
                });
                return;
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
            const campaign = await Campaign.findByIdAndDelete(req.params.id);
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

export default new CampaignController();
