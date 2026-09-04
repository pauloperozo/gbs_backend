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

export class GoogleLoginResponseDto {
  @ApiProperty({ example: 'da97e761-309f-43fb-9346-e5f262e4bd4b' })
  id!: string;
  @ApiProperty({ example: 'example@gmail.com' })
  email!: string;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token!: string;
}
