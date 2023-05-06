import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { MAIL_JOB, MAIL_QUEUE } from 'src/shared/constant';

@Processor(MAIL_QUEUE)
export class EmailConsumer {
  constructor(private mailService: MailerService) {}

  @Process(MAIL_JOB)
  async sendMail(job: Job<ISendMailOptions>) {
    try {
      console.warn('>>>sendmail', job);
      await this.mailService.sendMail(job.data);
    } catch (error) {
      // TODO: logger
    }
  }
}
