import {
  registerDecorator,
  ValidatorConstraint,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

type ValidationEntity =
  | {
      id?: number | string;
    }
  | undefined;

@Injectable()
@ValidatorConstraint({ name: 'IsNotExist', async: true })
export class IsNotExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0] as string;
    const currentValue = validationArguments.object as ValidationEntity;
    const entity = (await this.dataSource.getRepository(repository).findOne({
      where: {
        [validationArguments.property]: value,
      },
    })) as ValidationEntity;

    if (entity?.id === currentValue?.id) {
      return true;
    }

    return !entity;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is exist`;
  }
}

export function IsNotExist(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      propertyName: propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: property,
      validator: IsNotExistConstraint,
    });
  };
}
