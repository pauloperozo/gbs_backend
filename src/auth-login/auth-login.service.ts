import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginRequestDto } from './dto/auth-login.dto';
import { AUTH_MESSAGES } from '../shared/constants/auth.constants';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginRequestDto) {
    const user = this.usersService.findByEmail(loginDto.email);
    
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException(AUTH_MESSAGES.ERRORS.INVALID_CREDENTIALS);
    }

    const payload = { sub: user.id, email: user.email };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
