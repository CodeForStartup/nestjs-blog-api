import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { MAIL_QUEUE } from 'src/shared/constant';
import { EmailConsumer } from './email.consumer';
import { MailService } from './email.service';

@Global()
@Module({
  imports: [BullModule.registerQueue({ name: MAIL_QUEUE })],
  providers: [MailService, EmailConsumer],
  exports: [MailService],
})
export class MailModule {}
