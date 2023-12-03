import { ISendMailOptions } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MAIL_JOB, MAIL_QUEUE } from 'src/shared/constant';

@Injectable()
export class MailService {
  constructor(@InjectQueue(MAIL_QUEUE) private mailQueue: Queue) {}

  async registrationConfirmation(
    email: string,
    user: string,
    token: string,
  ): Promise<void> {
    this.mailQueue.add(MAIL_JOB, {
      to: email,
      subject: 'Registration confirmation',
      template: './registration-confirmation',
      context: {
        user,
        token,
      },
    } as ISendMailOptions);
  }
}
