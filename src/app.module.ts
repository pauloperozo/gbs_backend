import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthLoginModule } from './auth-login/auth-login.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    AuthLoginModule,
    AuthGoogleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
