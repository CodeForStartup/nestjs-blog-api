import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expireIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
}));
