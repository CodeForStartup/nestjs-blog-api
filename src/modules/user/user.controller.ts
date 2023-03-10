import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  NotFoundException,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
  })
  findAll(
    @Param('limit', new DefaultValuePipe(20)) limit?: number,
    @Param('offset', new DefaultValuePipe(0)) offset?: number,
  ) {
    return this.userService.findAll({
      limit,
      offset,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({
      id,
    });
  }

  @Post()
  @Public()
  async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    try {
      const user = await this.userService.create(createUserDto);

      return res.status(HttpStatus.CREATED).json({
        message: `User ${user.username} registration successfully.`,
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'An error happen while creating user.',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const user = this.userService.softDelete(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }
}
