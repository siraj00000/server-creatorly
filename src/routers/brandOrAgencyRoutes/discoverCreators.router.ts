import { Router } from 'express';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
import DiscoverCreatorsController from '../../controllers/brandOrAgencyController/discoverCreators.controller.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';

const discoverCreatorRouter = Router();

discoverCreatorRouter
    // Get creators of creatorly
    .get('/get-creators', protectMiddleware, brandOrAgencyAuth, DiscoverCreatorsController.discoverCreator);

export default discoverCreatorRouter;
