/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type PayloadType = {
  email: string;
  userId: string;
};

@Injectable()
export class JwtHelperService {
  constructor(private readonly jwtService: JwtService) {}
  getToken(authHeader: string): string {
    return authHeader.replace('Bearer ', '');
  }

  async getJwtPayload(authHeader: string): Promise<PayloadType | null> {
    const token = this.getToken(authHeader);
    try {
      await this.jwtService.verifyAsync(token);
      return this.jwtService.decode(this.getToken(authHeader)) as PayloadType;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
