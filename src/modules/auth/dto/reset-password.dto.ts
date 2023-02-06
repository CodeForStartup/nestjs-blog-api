import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}
