import { Router } from 'express';
import singleCreatorCampaignController from '../../../controllers/brandOrAgencyController/campaign_controllers/singleCreatorCampaign.controller.js';
import { protectMiddleware } from '../../../middleware/protect.middleware.js';
import brandOrAgencyAuth from '../../../middleware/brand_auth.middleware.js';
import { upload } from '../../../middleware/upload_file.middleware.js';
import authAdmin from '../../../middleware/auth_admin.middleware.js';

const singleCreatorCampaignRouter = Router();

// Create a campaign
singleCreatorCampaignRouter
    // Create campaign
    .post('/single-campaign', protectMiddleware, brandOrAgencyAuth, upload.single('campaign_image'), singleCreatorCampaignController.createSingleCampaign)

    // Get all campaign
    .get('/single-campaign', protectMiddleware, brandOrAgencyAuth, singleCreatorCampaignController.fetchCampaign)

    // Get all campaign by ID
    .get('/single-campaign/:id', protectMiddleware, brandOrAgencyAuth, singleCreatorCampaignController.fetchCampaignById)

    // fetch brand's campaign
    .get('/brand-single-campaigns', protectMiddleware, singleCreatorCampaignController.fetchCampaignsByBrandId)

    // fetch creators campaign
    .get('/creator-single-campaigns', protectMiddleware, singleCreatorCampaignController.fetchCampaignsByCreatorId)

    // fetch pending campaigns
    .get('/pending-single-campaigns', protectMiddleware, authAdmin, singleCreatorCampaignController.fetchPendingCampaigns)

    // Delete a campaign by ID
    .delete('/single-campaign/:id', protectMiddleware, brandOrAgencyAuth, singleCreatorCampaignController.deleteCampaignById);


export default singleCreatorCampaignRouter;
