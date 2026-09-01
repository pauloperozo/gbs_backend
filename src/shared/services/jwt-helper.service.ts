import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtUserPayload {
  id: string;
  email: string;
}

export interface JwtAuthResponse {
  access_token: string;
}

@Injectable()
export class JwtHelperService {
  constructor(private readonly jwtService: JwtService) { }

  generateAuthResponse(user: JwtUserPayload): JwtAuthResponse {

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
