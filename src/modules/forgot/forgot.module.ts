import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Forgot } from 'src/entities/forgot.entity';
import { UserModule } from 'src/modules/user/user.module';
import { ForgotService } from './forgot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Forgot]), UserModule],
  providers: [ForgotService],
  exports: [ForgotService],
})
export class ForgotModule {}
