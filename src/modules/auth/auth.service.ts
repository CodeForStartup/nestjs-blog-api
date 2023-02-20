import { get } from 'lodash/get';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { ForgotService } from 'src/modules/forgot/forgot.service';
import { EmailLoginDto } from './dto/email-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private forgotPasswordService: ForgotService,
  ) {}

  async validateUser(
    emailLoginDto: EmailLoginDto,
  ): Promise<{ access_token: string; user: User }> {
    const user = await this.userService.findOne({ email: emailLoginDto.email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValidated = await bcrypt.compare(
      emailLoginDto.password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'inCorrect',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      user,
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotPasswordService.create({
      email: forgotPasswordDto.email,
    });
  }

  async isTokenValid(hash: string) {
    const token = await this.forgotPasswordService.findOne({
      hash,
      isActive: true,
    });

    // TODO: need update expire time
    // if (!token || token?.expiresIn?.getTime() < Date.now()) {
    //   return false;
    // }
    if (token) {
      return true;
    }

    return false;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    console.warn('resetPasswordDto', resetPasswordDto);
    const token = await this.forgotPasswordService.findOne({
      hash: resetPasswordDto.hash,
    });
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            hash: 'Token is not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
    console.warn(token);
    const user = await this.userService.findOne({ email: token.user.email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            hash: 'User is not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userService.update(user.id, {
      password: resetPasswordDto.password,
    });
  }
}
