import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateForgotDto {
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}
