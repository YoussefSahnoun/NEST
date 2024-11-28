import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'] || req.headers['authorization'];

    if (authHeader) {
      let token: string;

     
      if (Array.isArray(authHeader)) {
        token = authHeader.join('');
      } else {
       
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
        } else {
          throw new UnauthorizedException('Malformed authorization header');
        }
      }

      try {
        const decoded = verify(token, 'secretKey'); 
        req['user'] = decoded; 
        next(); 
      } catch (e) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    } else {
      throw new UnauthorizedException('Authorization token missing');
    }
  }
}