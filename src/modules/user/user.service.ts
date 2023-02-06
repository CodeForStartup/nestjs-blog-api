import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import get from 'lodash/get';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<User[]> {
    const limit = get<number>(paginationQuery, 'limit', '10');
    const offset = get<number>(paginationQuery, 'offset', '0');

    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(fields: EntityCondition<User>) {
    const user = await this.userRepository.findOne({
      where: fields,
    });

    if (!user) {
      throw new NotFoundException(`User is not found`);
    }

    return user;
  }

  create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #{id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne({
      id,
    });

    return this.userRepository.remove(user);
  }

  async softDelete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
