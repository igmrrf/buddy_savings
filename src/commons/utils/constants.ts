import { Response } from 'express';
import RateLimiter from 'express-rate-limit';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * A user should not be allowed to make more than 600
 * requests every 10 minutes i.e a request per second
 */

export const APP_USE_LIMIT = RateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 600,
  message: 'Too many requests from user, try again after 10 minutes',
});

export const defaultCatchBlock = (res: Response, message = '') => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    data: null,
    message,
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};
