import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthLoginService } from './auth-login.service';
import { LoginRequestDto, LoginResponseDto } from './dto/auth-login.dto';
import { AUTH_MESSAGES } from '../shared/constants/auth.constants';

@ApiTags(AUTH_MESSAGES.SWAGGER.TAG)
@Controller('auth/login')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) { }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: AUTH_MESSAGES.SWAGGER.LOGIN_LOCAL_SUMMARY })
  @ApiResponse({ status: 200, description: AUTH_MESSAGES.SWAGGER.LOGIN_LOCAL_SUCCESS, type: LoginResponseDto })
  @ApiResponse({ status: 401, description: AUTH_MESSAGES.SWAGGER.INVALID_CREDENTIALS_DESC })
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authLoginService.login(loginDto);
  }
}
