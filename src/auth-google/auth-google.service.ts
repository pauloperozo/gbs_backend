import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { GoogleLoginRequestDto } from './dto/auth-google.dto';
import { AUTH_MESSAGES } from '../shared/constants/auth.constants';

@Injectable()
export class AuthGoogleService {
  private googleClient: OAuth2Client;
  private clientId: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.clientId = this.configService.get<string>('GOOGLE_CLIENT_ID') || 'default-client-id';
    this.googleClient = new OAuth2Client(this.clientId);
  }

  async signInWithGoogle(googleLoginDto: GoogleLoginRequestDto) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleLoginDto.idToken,
        audience: this.clientId,
      });

      const payload = ticket.getPayload();
      
      if (!payload || !payload.email) {
        throw new BadRequestException(AUTH_MESSAGES.ERRORS.INVALID_GOOGLE_TOKEN);
      }

      let user = this.usersService.findByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException(AUTH_MESSAGES.ERRORS.USER_NOT_REGISTERED);
      }

      const jwtPayload = { sub: user.id, email: user.email };

      return {
        access_token: this.jwtService.sign(jwtPayload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new UnauthorizedException(AUTH_MESSAGES.ERRORS.GOOGLE_VALIDATION_ERROR);
    }
  }
}
