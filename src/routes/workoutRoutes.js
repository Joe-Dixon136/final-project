import express from 'express';
import {
  getAllWorkoutsHandler,
  getWorkoutByIdHandler,
  createWorkoutHandler,
  updateWorkoutHandler,
  deleteWorkoutHandler,
} from '../controllers/workoutController.js';

import {
  validateId,
  validateCreateWorkout,
  validateUpdateWorkout,
  validateWorkoutQuery,
} from '../middleware/workoutValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', authenticate, validateWorkoutQuery, getAllWorkoutsHandler);
router.get('/:id', authenticate, validateId, getWorkoutByIdHandler);
router.post('/', authenticate, validateCreateWorkout, createWorkoutHandler);
router.put('/:id', authenticate, validateId, authorizeRoles('ADMIN'), validateUpdateWorkout, updateWorkoutHandler);
router.delete('/:id', authenticate, validateId, authorizeRoles('ADMIN'), deleteWorkoutHandler);


export default router;
