import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AUTH_MESSAGES } from '../../shared/constants/auth.constants';

// REQUEST DTO
export class LoginRequestDto {
  @ApiProperty({ example: 'admin@test.com', description: AUTH_MESSAGES.SWAGGER.DTO_EMAIL_DESC })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123', description: AUTH_MESSAGES.SWAGGER.DTO_PASSWORD_DESC })
  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token!: string;
}
