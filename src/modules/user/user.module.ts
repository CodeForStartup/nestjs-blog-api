import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IsExistConstraint } from 'src/utils/validators/is-exists.validator';
import { IsNotExistConstraint } from 'src/utils/validators/is-not-exists.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, IsExistConstraint, IsNotExistConstraint],
  exports: [UserService],
})
export class UserModule {}
