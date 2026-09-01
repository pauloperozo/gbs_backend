import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGoogleService } from './auth-google.service';
import { GoogleLoginRequestDto, GoogleLoginResponseDto } from './dto/auth-google.dto';
import { AUTH_MESSAGES } from '../shared/constants/auth.constants';

@ApiTags(AUTH_MESSAGES.SWAGGER.TAG)
@Controller('auth/google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) { }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AUTH_MESSAGES.SWAGGER.LOGIN_GOOGLE_SUMMARY })
  @ApiResponse({ status: 200, description: AUTH_MESSAGES.SWAGGER.LOGIN_GOOGLE_SUCCESS, type: GoogleLoginResponseDto })
  @ApiResponse({ status: 401, description: AUTH_MESSAGES.SWAGGER.GOOGLE_TOKEN_ERROR_DESC })
  async googleLogin(@Body() googleLoginDto: GoogleLoginRequestDto): Promise<GoogleLoginResponseDto> {
    return this.authGoogleService.signInWithGoogle(googleLoginDto);
  }
}
