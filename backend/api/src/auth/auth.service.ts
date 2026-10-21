import { Injectable } from '@nestjs/common';
import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private jwks = jwksClient({
    jwksUri: process.env.AUTH_SERVER_JWKS_URL || '',
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10 * 60 * 1000,
  });

  async verifyToken(token: string): Promise<any> {
    if (!process.env.AUTH_SERVER_JWKS_URL) {
      return jwt.decode(token);
    }
    const decoded = jwt.decode(token, { complete: true }) as any;
    const kid = decoded?.header?.kid;
    const key = await this.jwks.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    return jwt.verify(token, signingKey);
  }
}


