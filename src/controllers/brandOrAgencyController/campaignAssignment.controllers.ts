import { Request, Response, NextFunction } from 'express';
import CampaignAssignment from '../../models/brandOrAgencyModels/campaignAssignment.model.js';
import { ErrorResponse } from '../../utils/error_response.utils.js';
import { validateCampaignAssignmentStatus } from '../../utils/validate_campaign_assignment_status.js';
import Campaign from '../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
import MyBrand from '../../models/brandOrAgencyModels/myBrands.model.js';

class CampaignAssignmentController {
    public async createCampaignAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { campaign_id, sub_brand_ids, status } = req.body;

            // Validate campaign assignment status
            if (status && !validateCampaignAssignmentStatus(status)) {
                throw new ErrorResponse(400, 'Invalid campaign assignment status');
            }

            // Check if campaign exists
            const campaign = await Campaign.findById(campaign_id);
            if (!campaign) {
                throw new ErrorResponse(404, 'Campaign not found');
            }

            // Check if sub-brands exist
            const sub_brands = await MyBrand.find({ _id: { $in: sub_brand_ids } });
            if (sub_brands.length !== sub_brand_ids.length) {
                throw new ErrorResponse(404, 'Some sub-brands not found');
            }

            const newCampaignAssignments = sub_brand_ids.map((sub_brand_id: string) => ({
                campaign_id,
                sub_brand_id,
                status
            }));

            const createdCampaignAssignments = await CampaignAssignment.insertMany(newCampaignAssignments);

            res.status(201).json({
                success: true,
                data: createdCampaignAssignments
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchAssignedCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { campaignAssignmentId } = req.params;

            // Fetch campaign assignment by ID with populated campaign and sub-brand details
            const campaignAssignment = await CampaignAssignment.findById(campaignAssignmentId).populate('campaign_id').populate('sub_brand_id');

            if (!campaignAssignment) {
                throw new ErrorResponse(404, 'Campaign assignment not found');
            }

            res.status(200).json({
                success: true,
                data: campaignAssignment
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateCampaignAssignmentStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { campaignAssignmentId } = req.params;
            const { status } = req.body;

            // Validate campaign assignment status
            if (status && !validateCampaignAssignmentStatus(status)) {
                throw new ErrorResponse(400, 'Invalid campaign assignment status');
            }

            // Update campaign assignment status
            const updatedCampaignAssignment = await CampaignAssignment.findByIdAndUpdate(campaignAssignmentId, { status }, { new: true });

            if (!updatedCampaignAssignment) {
                res.status(404).json({
                    success: false,
                    message: 'Campaign assignment not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: updatedCampaignAssignment
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteCampaignAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { campaignAssignmentId } = req.params;

            // Find campaign assignment by ID
            const campaignAssignment = await CampaignAssignment.findById(campaignAssignmentId);

            if (!campaignAssignment) {
                res.status(404).json({
                    success: false,
                    message: 'Campaign assignment not found'
                });
                return;
            }

            // Delete campaign assignment
            await campaignAssignment.remove();

            res.status(200).json({
                success: true,
                message: 'Campaign assignment deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CampaignAssignmentController();
