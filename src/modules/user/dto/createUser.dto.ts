import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { AuthProvidersEnum } from 'src/shared/constant';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotExist(['User'])
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsDateString()
  birthDate?: Date;

  @ApiPropertyOptional()
  @IsStrongPassword()
  password?: string;

  @ApiPropertyOptional({ enum: AuthProvidersEnum })
  provider?: string;

  @ApiPropertyOptional()
  socialId?: string | null;
}
