import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      username: string;
      email: string | null;
      avatarUrl: string | null;
    };
    accessToken?: string;
  }
}