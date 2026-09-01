import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';

@Module({
  imports: [SharedModule, ConfigModule],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService],
})
export class AuthGoogleModule {}
