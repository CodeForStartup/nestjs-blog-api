import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'localhost',
  port: process.env.MAIL_PORT || 1025,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
  ignore_tls: process.env.MAIL_IGNORE_TLS,
  secure: process.env.MAIL_SECURE,
  require_tls: process.env.MAIL_REQUIRE_TLS,
  default_email: process.env.MAIL_DEFAULT_EMAIL,
  default_name: process.env.MAIL_DEFAULT_NAME,
  client_port: process.env.MAIL_CLIENT_PORT,
}));
