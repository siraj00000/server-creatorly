import { Router } from 'express';
import campaignAssignment from '../../controllers/brandOrAgencyController/campaignAssignment.controllers.js';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';

const campaignAssignmentRouter = Router();

// Create a campaign
campaignAssignmentRouter
    .post('/campaign-assignment', protectMiddleware, brandOrAgencyAuth, campaignAssignment.createCampaignAssignment)

    // Get all campaign
    .get('/campaign-assignment', protectMiddleware, brandOrAgencyAuth, campaignAssignment.fetchAssignedCampaign)

    // Update a campaign by ID
    .put('/campaign-assignment/:id', protectMiddleware, brandOrAgencyAuth, campaignAssignment.updateCampaignAssignmentStatus)

    // Delete a campaign by ID
    .delete('/campaign-assignment/:id', protectMiddleware, brandOrAgencyAuth, campaignAssignment.deleteCampaignAssignment);

export default campaignAssignmentRouter;
