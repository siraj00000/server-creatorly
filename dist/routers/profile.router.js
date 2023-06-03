import { Router } from 'express';
import { protectMiddleware } from '../middleware/protect.middleware.js';
import profileController from '../controllers/profile.controller.js';
const profileRouter = Router();
profileRouter.get('/profile', protectMiddleware, profileController.getProfile);
export default profileRouter;
//# sourceMappingURL=profile.router.js.map