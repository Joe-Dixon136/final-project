import { body, param, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignup = [
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .bail()
    .trim()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must contain at least 8 characters and at most 32 characters'),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];

export const validateLogin = [
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .bail()
    .trim()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateUpdateMe = [
  oneOf(
    [body('username').exists(), body('password').exists()],
    { message: 'At least one field (username or password) must be provided' }
  ),

  body('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .bail()
    .trim()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('password')
    .optional()
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must contain at least 8 characters and at most 32 characters'),

  handleValidationErrors,
];

export const validateRoleUpdate = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  body('role')
    .exists({ checkFalsy: true })
    .withMessage('Role is required')
    .bail()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];
