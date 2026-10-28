```javascript
// backend/src/middleware/validation.js
const { body, validationResult } = require('express-validator');

/**
 * Validation chain for creating a new appointment.
 * Expects:
 *   - start_time: ISO 8601 date string
 *   - end_time: ISO 8601 date string, must be after start_time
 *   - provider_id: positive integer
 *   - client_name: non-empty string (max 100 chars)
 *   - status: optional, must be one of 'pending', 'confirmed', 'canceled'
 */
const createAppointmentValidation = [
  body('start_time')
    .isISO()
    .withMessage('Start time must be a valid ISO 8601 date')
    .toDate(),

  body('end_time')
    .isISO()
    .withMessage('End time must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      const start = new Date(req.body.start_time);
      const end = new Date(value);
      if (end <= start) {
        throw new Error('End time must be after start time');
      }
      return true;
    })
    .toDate(),

  body('provider_id')
    .isInt({ gt: 0 })
    .withMessage('Provider ID must be a positive integer')
    .toInt(),

  body('client_name')
    .trim()
    .notEmpty()
    .withMessage('Client name is required')
    .isLength({ max: 100 })
    .withMessage('Client name cannot exceed 100 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'canceled'])
    .withMessage('Status must be one of pending, confirmed, or canceled')
    .toLowerCase(),
];

/**
 * Middleware to validate request bodies and respond with 400 if errors exist.
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  createAppointmentValidation,
  validate,
};