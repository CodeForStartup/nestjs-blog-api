import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { IsExist } from 'src/utils/validators/is-exists.validator';

export class EmailLoginDto {
  @ApiProperty({ example: 'user@codeforstartup.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsExist('User')
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
