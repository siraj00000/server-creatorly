import { Router } from 'express';
import invoiceController from '../../controllers/creatorController/invoice.controller.js';
import creatorAuth from '../../middleware/create_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import { upload } from '../../middleware/upload_file.middleware.js';

const invoiceRouter = Router();

invoiceRouter
    .post('/create-invoice', protectMiddleware, creatorAuth, upload.single('inv_image'), invoiceController.createInvoice)
    .get('/invoices', protectMiddleware, creatorAuth, invoiceController.getMasterInvoices)
    .get('/invoice/:masterInvoiceId', protectMiddleware, creatorAuth, invoiceController.getSingleInvoice);

export default invoiceRouter;
