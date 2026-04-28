import express from 'express';
import {
  getAllLogsHandler,
  getLogByIdHandler,
  createLogHandler,
  updateLogHandler,
  deleteLogHandler,
} from '../controllers/logController.js';

import {
  validateId,
  validateCreateLog,
  validateUpdateLog,
  validateLogQuery,
  authorizeLogOwnership
} from '../middleware/logValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', authenticate, validateLogQuery, authorizeRoles('ADMIN'), getAllLogsHandler);
router.get('/:id', authenticate, validateId, authorizeLogOwnership, getLogByIdHandler);
router.post('/', authenticate, validateCreateLog, createLogHandler);
router.put('/:id', authenticate, validateId, authorizeLogOwnership, validateUpdateLog, updateLogHandler);
router.delete('/:id', authenticate, validateId, authorizeLogOwnership, deleteLogHandler);


export default router;