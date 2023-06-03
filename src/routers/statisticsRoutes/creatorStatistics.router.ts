import { Router } from 'express';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import CreatorAnalyticsController from '../../controllers/statisticsController/creatorStatistics.controller.js';
import creatorAuth from '../../middleware/create_auth.middleware.js';

const creatorStatsRouter = Router();

creatorStatsRouter.get(`/creator-analytics/:month`, protectMiddleware, creatorAuth, CreatorAnalyticsController.analytics);

export default creatorStatsRouter;