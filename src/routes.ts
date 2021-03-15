import { Router } from 'express';

import UserController from './controllers/User';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ ok: true });
});

router.get('/users', UserController.list);
router.post('/users', UserController.store);

export default router;
