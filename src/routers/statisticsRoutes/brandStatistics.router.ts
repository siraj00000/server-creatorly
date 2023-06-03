import { Router } from 'express';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
import brandStatisticsController from '../../controllers/statisticsController/brandStatistics.controller.js';

const brandStatsRouter = Router();

brandStatsRouter.get(`/brand-analytics/:month`, protectMiddleware, brandOrAgencyAuth, brandStatisticsController.brandAnalytics);

export default brandStatsRouter;
