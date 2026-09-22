import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';

export class BaseError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;

  constructor(
    code: string,
    message?: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message || ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || 'Unknown error');
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }
}
