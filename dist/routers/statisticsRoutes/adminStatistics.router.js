import { Router } from 'express';
import adminStatisticsController from '../../controllers/statisticsController/adminStatistics.controller.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import authAdmin from '../../middleware/auth_admin.middleware.js';
const adminStatsRouter = Router();
adminStatsRouter
    .post(`/stats`, protectMiddleware, authAdmin, adminStatisticsController.getStats)
    .get(`/old-analytics/:month`, protectMiddleware, authAdmin, adminStatisticsController.siteAnalytics)
    .get(`/analytics/:month`, protectMiddleware, authAdmin, adminStatisticsController.analytics);
export default adminStatsRouter;
//# sourceMappingURL=adminStatistics.router.js.map