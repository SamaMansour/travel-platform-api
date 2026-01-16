import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt-auth/jwt.strategy';
import { RefreshStrategy } from './jwt-auth/refresh.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_secret',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,       // ✅ REQUIRED
    RefreshStrategy,   // ✅ REQUIRED (THIS FIXES jwt-refresh)
  ],
})
export class AuthModule {}
