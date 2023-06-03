import { Router } from 'express';
import visitorController from '../../controllers/creatorController/visitor.controller.js';
const visitorRouter = Router();
visitorRouter
    .post('/add-visitor', visitorController.addVisitor)
    .get('/get-not-registered-visitor', visitorController.getNotRegisteredVisitors);
export default visitorRouter;
//# sourceMappingURL=visitor.router.js.map