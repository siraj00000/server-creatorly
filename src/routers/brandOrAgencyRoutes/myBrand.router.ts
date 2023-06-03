import { Router } from 'express';
import myBrandController from '../../controllers/brandOrAgencyController/myBrand.controller.js';
import brandOrAgencyAuth from '../../middleware/brand_auth.middleware.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import { upload } from '../../middleware/upload_file.middleware.js';

const myBrandRouter = Router();

// Create a campaign
myBrandRouter
    .post('/my-brand', protectMiddleware, brandOrAgencyAuth, upload.single('brand-logo'), myBrandController.createMyBrand)

    // Get all campaign
    .get('/my-brand', protectMiddleware, brandOrAgencyAuth, myBrandController.fetchMyBrands)

    // Get all campaign by ID
    .get('/my-brand/:id', protectMiddleware, brandOrAgencyAuth, myBrandController.fetchSpecificMyBrand)

    // Update a campaign by ID
    .put('/my-brand/:id', protectMiddleware, brandOrAgencyAuth, myBrandController.updateMyBrand)

    // Delete a campaign by ID
    .delete('/my-brand/:id', protectMiddleware, brandOrAgencyAuth, myBrandController.deleteMyBrand);

export default myBrandRouter;
