import express from 'express';
import {
  getAllExercisesHandler,
  getExerciseByIdHandler,
  createExerciseHandler,
  updateExerciseHandler,
  deleteExerciseHandler,
} from '../controllers/exerciseController.js';

import {
  validateId,
  validateCreateExercise,
  validateUpdateExercise,
  validateExerciseQuery,
} from '../middleware/exerciseValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', authenticate, validateExerciseQuery, getAllExercisesHandler);
router.get('/:id', authenticate, validateId, getExerciseByIdHandler);
router.post('/', authenticate, validateCreateExercise, createExerciseHandler);
router.put('/:id', authenticate, validateId, authorizeRoles('ADMIN'), validateUpdateExercise, updateExerciseHandler);
router.delete('/:id', authenticate, validateId, authorizeRoles('ADMIN'), deleteExerciseHandler);


export default router;
