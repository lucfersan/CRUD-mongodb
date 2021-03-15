import { Router } from 'express';

import UserController from './controllers/User';

const router = Router();

router.get('/users', UserController.list);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;
