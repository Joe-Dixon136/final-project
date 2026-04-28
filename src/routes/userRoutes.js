import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
  updateMeHandler,
  deleteMeHandler,
  updateUserRoleHandler,
} from '../controllers/userController.js';

import {
  validateUpdateMe,
  validateRoleUpdate,
} from '../middleware/userValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getMeHandler);
router.put('/me', authenticate, validateUpdateMe, updateMeHandler);
router.delete('/me', authenticate, deleteMeHandler);

router.patch(
  '/:id/role',
  authenticate,
  authorizeRoles('ADMIN'),
  validateRoleUpdate,
  updateUserRoleHandler
);

export default router;