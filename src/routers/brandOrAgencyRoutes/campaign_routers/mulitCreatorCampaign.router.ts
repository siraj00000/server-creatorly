import { Router } from 'express';
import multiCreatorCampaignController from '../../../controllers/brandOrAgencyController/campaign_controllers/multiCreatorCampaign.controller.js';
import { protectMiddleware } from '../../../middleware/protect.middleware.js';
import brandOrAgencyAuth from '../../../middleware/brand_auth.middleware.js';
import { upload } from '../../../middleware/upload_file.middleware.js';
import authAdmin from '../../../middleware/auth_admin.middleware.js';

const multiCreatorCampaignRouter = Router();

// Create a campaign
multiCreatorCampaignRouter
    // Create campaign
    .post('/campaign', protectMiddleware, brandOrAgencyAuth, upload.single('campaign_image'), multiCreatorCampaignController.createCampaign)

    // Get all campaign
    .get('/campaign', protectMiddleware, brandOrAgencyAuth, multiCreatorCampaignController.fetchCampaign)

    // Get all campaign by ID
    .get('/campaign/:id', protectMiddleware, brandOrAgencyAuth, multiCreatorCampaignController.fetchCampaignById)

    // fetch brand's campaign
    .get('/brand-campaigns', protectMiddleware, multiCreatorCampaignController.fetchCampaignsByBrandId)

    // fetch creators campaign
    .get('/creator-campaigns', protectMiddleware, multiCreatorCampaignController.fetchCampaignsByCreatorId)

    // fetch pending campaigns
    .get('/pending-campaigns', protectMiddleware, authAdmin, multiCreatorCampaignController.fetchPendingCampaigns)

    // Delete a campaign by ID
    .delete('/campaign/:id', protectMiddleware, brandOrAgencyAuth, multiCreatorCampaignController.deleteCampaignById);

export default multiCreatorCampaignRouter;