import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_MESSAGES } from '../../shared/constants/auth.constants';

// REQUEST DTO
export class GoogleLoginRequestDto {
  @ApiProperty({ example: 'eyJhbGciOiJSUzI1NiIs...', description: AUTH_MESSAGES.SWAGGER.DTO_GOOGLE_TOKEN_DESC })
  @IsString()
  @IsNotEmpty()
  idToken!: string;
}

// RESPONSE DTO
class GoogleUserResponse {
  @ApiProperty({ example: '1' })
  id!: string;

  @ApiProperty({ example: 'admin@test.com' })
  email!: string;

  @ApiProperty({ example: 'Admin User' })
  name!: string;
}

export class GoogleLoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token!: string;

  @ApiProperty({ type: GoogleUserResponse })
  user!: GoogleUserResponse;
}
