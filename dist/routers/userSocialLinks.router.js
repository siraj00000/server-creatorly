import { Router } from 'express';
import SocialLinkController from '../controllers/socialLinks.controller.js';
import creatorAuth from '../middleware/create_auth.middleware.js';
import { protectMiddleware } from '../middleware/protect.middleware.js';
const socialLinkRouter = Router();
// Create a social link
socialLinkRouter.post('/social-links', protectMiddleware, creatorAuth, SocialLinkController.createSocialLink);
// Get all social links
socialLinkRouter.get('/social-links', protectMiddleware, creatorAuth, SocialLinkController.fetchSocialLinks);
// Update a social link by ID
socialLinkRouter.put('/social-links/:id', protectMiddleware, creatorAuth, SocialLinkController.updateSocialLink);
// Delete a social link by ID
socialLinkRouter.delete('/social-links/:id', protectMiddleware, creatorAuth, SocialLinkController.deleteSocialLink);
export default socialLinkRouter;
//# sourceMappingURL=userSocialLinks.router.js.map