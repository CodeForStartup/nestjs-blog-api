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
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsString()
  username: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: 'EMAIL_ALREADY_EXIST',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsDateString()
  birthDate: Date;

  @IsStrongPassword()
  password: string;

  provider?: string;

  socialId?: string | null;
}
