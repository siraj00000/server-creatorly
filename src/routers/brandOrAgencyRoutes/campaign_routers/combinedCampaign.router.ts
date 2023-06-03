import { Router } from 'express';
import authAdmin from '../../../middleware/auth_admin.middleware.js';
import { protectMiddleware } from '../../../middleware/protect.middleware.js';
import combinedCampaignController from '../../../controllers/brandOrAgencyController/campaign_controllers/combinedCampaign.controller.js';
import creatorAuth from '../../../middleware/create_auth.middleware.js';
import brandOrAgencyAuth from '../../../middleware/brand_auth.middleware.js';

const combinedCampaignRouter = Router();

combinedCampaignRouter
    .get('/combined-pending-campaigns', protectMiddleware, authAdmin, combinedCampaignController.fetchPendingCampaigns)
    .get('/combined-approved-campaigns', protectMiddleware, creatorAuth, combinedCampaignController.fetchApprovedCampaigns)
    .get('/combined-denied-campaigns', protectMiddleware, brandOrAgencyAuth, combinedCampaignController.fetchDeniedCampaigns)
    // Update a campaign by ID
    .put('/campaign-update/:id', protectMiddleware, authAdmin, combinedCampaignController.updateCampaignbyId);

export default combinedCampaignRouter;
