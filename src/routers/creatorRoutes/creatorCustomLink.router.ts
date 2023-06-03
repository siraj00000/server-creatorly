import { Router } from 'express';
import creatorCustomLink from '../../controllers/creatorController/creatorCustomLink.controller.js';
import creatorAuth from '../../middleware/create_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';

const creatorCustomLinkRouter = Router();

// Create a creator's online presence
creatorCustomLinkRouter
    .post('/creator-custom-link', protectMiddleware, creatorAuth, creatorCustomLink.createCustomLink)

    // Get all creator's online presences
    .get('/creator-custom-link', protectMiddleware, creatorAuth, creatorCustomLink.fetchCustomLinks)
   
    // Get all creator's online presences
    .get('/creator-custom-link/:id', protectMiddleware, creatorAuth, creatorCustomLink.fetchCustomLinkById)

    // Update a creator's online presence by ID
    .put('/creator-custom-link/:id', protectMiddleware, creatorAuth, creatorCustomLink.updateCustomLinkById)

    // Delete a creator's online presence by ID
    .delete('/creator-custom-link/:id', protectMiddleware, creatorAuth, creatorCustomLink.deleteCustomLinkById);

export default creatorCustomLinkRouter;
