import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      // Decode the token using the secret key
      const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
      const decoded = verify(token, 'yourSecretKey'); // Replace 'yourSecretKey' with your JWT secret
      console.log('Decoded Token:', decoded);

      // Extract the userId and attach it to the request
      const { userId } = decoded as { userId: string };
      if (!userId) {
        throw new UnauthorizedException('Invalid token: userId not found');
      }

      req['user'] = { userId };
      next(); // Continue to the next middleware/controller
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
