import { Router } from 'express';
import BrandOrAgencyOnlinePresenceController from '../../controllers/brandOrAgencyController/brandOrAgencyOnlinePresence.controller.js';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
const brandOrAgencyOnlinePresenceRouter = Router();
// Create a brand/agency
brandOrAgencyOnlinePresenceRouter
    .post('/brand-online-presence', protectMiddleware, brandOrAgencyAuth, BrandOrAgencyOnlinePresenceController.createBrandOrAgencyOnlinePresence)
    // Get all brand/agency
    .get('/brand-online-presence', protectMiddleware, brandOrAgencyAuth, BrandOrAgencyOnlinePresenceController.fetchBrandOrAgencyOnlinePresence)
    // Update a brand/agency by ID
    .put('/brand-online-presence/:id', protectMiddleware, brandOrAgencyAuth, BrandOrAgencyOnlinePresenceController.updateBrandOrAgencyOnlinePresence)
    // Delete a brand/agency by ID
    .delete('/brand-online-presence/:id', protectMiddleware, brandOrAgencyAuth, BrandOrAgencyOnlinePresenceController.deleteBrandOrAgencyOnlinePresence);
export default brandOrAgencyOnlinePresenceRouter;
//# sourceMappingURL=brandOrAgencyOnlinePresence.router.js.map