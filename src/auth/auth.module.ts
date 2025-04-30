import { Module } from '@nestjs/common';
//import { BearerAuthGuard } from './bearer-auth/bearer-auth.guard';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
