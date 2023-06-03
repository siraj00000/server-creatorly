import { Router } from 'express';
import CampaignController from '../../controllers/brandOrAgencyController/campaign.controller.js';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import { upload } from '../../middleware/upload_file.middleware.js';
import authAdmin from '../../middleware/auth_admin.middleware.js';

const campaignRouter = Router();

// Create a campaign
campaignRouter
    // Create campaign
    .post('/campaign', protectMiddleware, brandOrAgencyAuth, upload.single('campaign_image'), CampaignController.createCampaign)
    
    // Create campaign with single creator id
    .post('/single-campaign', protectMiddleware, brandOrAgencyAuth, upload.single('campaign_image'), CampaignController.createSingleCampaign)

    // Get all campaign
    .get('/campaign', protectMiddleware, brandOrAgencyAuth, CampaignController.fetchCampaign)

    // Get all campaign by ID
    .get('/campaign/:id', protectMiddleware, brandOrAgencyAuth, CampaignController.fetchCampaignById)

    // fetch brand's campaign
    .get('/brand-campaigns', protectMiddleware, CampaignController.fetchCampaignsByBrandId)

    // fetch creators campaign
    .get('/creator-campaigns', protectMiddleware, CampaignController.fetchCampaignsByCreatorId)

    // fetch pending campaigns
    .get('/pending-campaigns', protectMiddleware, authAdmin, CampaignController.fetchPendingCampaigns)

    // Update a campaign by ID
    .put('/campaign/:id', protectMiddleware, authAdmin, CampaignController.updateCampaignbyId)

    // Delete a campaign by ID
    .delete('/campaign/:id', protectMiddleware, brandOrAgencyAuth, CampaignController.deleteCampaignById);

export default campaignRouter;
