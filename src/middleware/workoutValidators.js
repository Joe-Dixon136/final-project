import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateWorkout = [
  body('name')
    .exists({ checkFalsy: true }).withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  handleValidationErrors,
];

export const validateUpdateWorkout = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('muscleGroup').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, muscle group, description) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Muscle group must be a string')
    .bail(),
  handleValidationErrors,
];

export const validateWorkoutQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'userId'])
    .withMessage('sortBy must be one of id, name, userId'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors,
];