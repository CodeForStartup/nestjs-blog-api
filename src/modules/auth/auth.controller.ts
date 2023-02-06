import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

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

  // @Post('forgot-password')
  // @Public()
  // @ApiOperation({ summary: 'Forgot Password' })
  // async forgotPassword() {

  // }
}
