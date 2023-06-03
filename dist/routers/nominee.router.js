import { Router } from 'express';
import nomineeController from '../controllers/nominee.controller.js';
const router = Router();
router
    .post('/nominee', nomineeController.createNominee)
    .get('/nominee', nomineeController.fetchNominees);
export default router;
//# sourceMappingURL=nominee.router.js.map