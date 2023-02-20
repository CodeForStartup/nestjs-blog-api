import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { UserService } from 'src/modules/user/user.service';
import { Forgot } from 'src/entities/forgot.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CreateForgotDto } from './dto/createForgot.dto';

@Injectable()
export class ForgotService {
  constructor(
    @InjectRepository(Forgot) private forgotRepository: Repository<Forgot>,
    private dataSource: DataSource,
    private userService: UserService,
  ) {}

  findOne(fields: EntityCondition<Forgot>) {
    const forgot = this.forgotRepository.findOne({
      where: fields,
      relations: ['user'],
    });

    if (!forgot) {
      throw new NotFoundException('Not found');
    }

    return forgot;
  }

  async create(forgot: CreateForgotDto): Promise<Pick<Forgot, 'hash'>> {
    const user = await this.userService.findOne({ email: forgot.email });

    if (!user) {
      throw new NotFoundException('Email is not registered yet');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const now = new Date();
    const expiredUTCDate = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + 1,
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds(),
    );

    const newForgot = this.forgotRepository.create({
      hash,
      user,
      isActive: true,
      expiresIn: expiredUTCDate,
    });

    try {
      await queryRunner.manager.save(newForgot);

      await this.forgotRepository
        .createQueryBuilder()
        .update(Forgot, { isActive: false })
        .where('userId = :id', { id: user.id })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();

      throw new InternalServerErrorException({
        message: error.message,
      });
    } finally {
      await queryRunner.release();
    }

    return {
      hash: newForgot.hash,
    };
  }
}
