import { BaseError } from './BaseError';
import { ERROR_CODES } from '../constants/errors';

export class APIError extends BaseError {
  constructor(
    code: string,
    message?: string,
    statusCode: number = 500
  ) {
    super(code, message, statusCode);
  }
}

export class ValidationError extends APIError {
  constructor(message: string = 'Invalid input provided') {
    super('VAL_001', message, 400);
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string = 'Resource') {
    super('RES_001', `${resource} not found`, 404);
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = 'Authentication failed') {
    super('AUTH_001', message, 401);
  }
}

export class AuthorizationError extends APIError {
  constructor(message: string = 'Authorization failed') {
    super('AUTH_002', message, 403);
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Rate limit exceeded') {
    super('RATE_001', message, 429);
  }
}
