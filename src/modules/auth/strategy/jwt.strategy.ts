import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAppConfig } from 'src/config';
import { User } from 'src/entities/user.entity';

type JwtPayload = Pick<User, 'id'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService<IAppConfig, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
