import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { applicationConfig } from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(applicationConfig.KEY)
    private appConfig: ConfigType<typeof applicationConfig>,
  ) {}

  getHello(): string {
    return `PORT: ${this.appConfig.port}`;
  }
}
