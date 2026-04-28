import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { getLogById } from '../services/logService.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateLog = [
  body('workoutId')
    .exists({ checkFalsy: true }).withMessage('workoutId is required')
    .bail()
    .escape()
    .isInt().withMessage('workoutId must be an integer')
    .toInt(),
  handleValidationErrors,
];

export const validateUpdateLog = [
  body('workoutId')
    .exists({ checkFalsy: true }).withMessage('workoutId is required')
    .bail()
    .escape()
    .isInt().withMessage('workoutId must be an integer')
    .toInt(),
  handleValidationErrors,
];

export const validateLogQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'userId', 'workoutId', 'date'])
    .withMessage('sortBy must be one of id, userId, workoutId, date'),

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

export async function authorizeLogOwnership(req,res,next){
    const id = parseInt(req.params.id);
    const log = await getLogById(id);
    if(log.userId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        return next(error);
    }
    next();
}