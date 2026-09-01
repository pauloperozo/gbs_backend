import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtHelperService } from '../shared/services/jwt-helper.service';
import { UsersService } from '../users/users.service';
import { LoginRequestDto } from './dto/auth-login.dto';
import { AUTH_MESSAGES } from '../shared/constants/auth.constants';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly jwtHelperService: JwtHelperService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginRequestDto) {
    const user = this.usersService.findByEmail(loginDto.email);
    
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException(AUTH_MESSAGES.ERRORS.INVALID_CREDENTIALS);
    }

    return this.jwtHelperService.generateAuthResponse(user);
  }
}
