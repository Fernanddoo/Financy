// src/types/AuthenticatedRequest.ts

import { Request } from 'express';

// Esse type serve para garantir que quando o token JWT está sendo
// passado na requisição, não se perca
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
