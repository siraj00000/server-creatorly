import { Router } from 'express';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import profileController from '../../controllers/userController/profile.controller.js';
import { upload } from '../../middleware/upload_file.middleware.js';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
const profileRouter = Router();
profileRouter
    // Create or update all profile data
    .post('/profile', protectMiddleware, upload.single('profile_image'), profileController.createOrUpdateProfile)
    // Get all profile data
    .get('/profile', protectMiddleware, profileController.getProfile)
    // Fetch profile data
    .post('/fetch-profile', protectMiddleware, profileController.filterProfiles)
    // Get all profile data and only authentic brand can do it
    .get('/profile/:user_id', protectMiddleware, brandOrAgencyAuth, profileController.getProfileByUserId)
    // Delete profile data
    .delete('/profile', protectMiddleware, profileController.deleteProfile);
export default profileRouter;
//# sourceMappingURL=profile.router.js.map