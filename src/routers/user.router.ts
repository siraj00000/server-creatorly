import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router
    .post('/register-user', userController.createUser)
    .post('/login-user', userController.userLogin)
    .post('/forgot-password', userController.forgetPassword)
    .post('/reset-password', userController.resetPassword);

export default router;
