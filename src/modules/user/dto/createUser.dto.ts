import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { AuthProvidersEnum } from 'src/shared/constant';
import { IsExist } from 'src/utils/validators/is-exists.validator';
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
  @Validate(IsNotExist, ['User'], {
    message: 'EMAIL_ALREADY_EXIST',
  })
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
