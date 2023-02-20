import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Email Login' })
  login(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.validateUser(emailLoginDto);
  }

  @Post('forgot-password')
  @Public()
  @ApiOperation({ summary: 'Forgot password' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @Public()
  @ApiOperation({ summary: 'Reset Password' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('is-token-valid/:hash')
  @Public()
  @ApiOperation({ summary: 'Check hash token is valid or not' })
  isTokenValid(@Param('hash') hash: string) {
    return this.authService.isTokenValid(hash);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  refreshToken() {
    return '';
  }
}
