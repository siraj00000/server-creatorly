import { Router } from 'express';
import CreatorOnlinePresenceController from '../../controllers/creatorController/creatorOnlinePresence.controller.js';
import creatorAuth from '../../middleware/create_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';

const creatorOnlinePresenceRouter = Router();

creatorOnlinePresenceRouter
    // Create a creator's online presence
    .post('/creator-online-presence', protectMiddleware, creatorAuth, CreatorOnlinePresenceController.createSocialLink)

    // Get all creator's online presences
    .get('/creator-online-presence', protectMiddleware, creatorAuth, CreatorOnlinePresenceController.fetchCreatorOnlinePresences)

    // Get all creator's link tree
    .get('/creator-online-presence/:username', CreatorOnlinePresenceController.fetchLinkTree)

    // Update a creator's online presence by ID
    .put('/creator-online-presence/:id', protectMiddleware, creatorAuth, CreatorOnlinePresenceController.updateSocialLink)

    // Delete a creator's online presence by ID
    .delete('/creator-online-presence/:id', protectMiddleware, creatorAuth, CreatorOnlinePresenceController.deleteSocialLink);

export default creatorOnlinePresenceRouter;
