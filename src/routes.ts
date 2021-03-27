import { Router } from 'express';

import UserController from './controllers/User';
import SessionController from './controllers/Session';

import AuthMiddleware from './middlewares/Auth';

const router = Router();

router.get('/users', UserController.list);
router.post('/users', UserController.store);
router.put('/users/:id', AuthMiddleware, UserController.update);
router.delete('/users/:id', AuthMiddleware, UserController.delete);

router.post('/session', SessionController.store);

export default router;
