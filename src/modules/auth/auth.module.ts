import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { ForgotModule } from 'src/modules/forgot/forgot.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ForgotModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        secret: configService.get('auth.secret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.expireIn', { infer: true }),
          algorithm: 'HS256',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
