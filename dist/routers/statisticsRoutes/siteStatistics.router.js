import { Router } from 'express';
import siteStatisticsController from '../../controllers/statisticsController/siteStatistics.controller.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import authAdmin from '../../middleware/auth_admin.middleware.js';
const statsRouter = Router();
statsRouter
    .post(`/stats`, protectMiddleware, authAdmin, siteStatisticsController.getStats)
    .get(`/old-analytics/:month`, protectMiddleware, authAdmin, siteStatisticsController.siteAnalytics)
    .get(`/analytics/:month`, protectMiddleware, authAdmin, siteStatisticsController.analytics);
export default statsRouter;
//# sourceMappingURL=siteStatistics.router.js.map