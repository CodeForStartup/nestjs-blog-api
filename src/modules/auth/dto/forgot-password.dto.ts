import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  email: string;
}
