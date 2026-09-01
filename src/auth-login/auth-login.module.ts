import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';

@Module({
  imports: [SharedModule],
  controllers: [AuthLoginController],
  providers: [AuthLoginService],
})
export class AuthLoginModule {}
