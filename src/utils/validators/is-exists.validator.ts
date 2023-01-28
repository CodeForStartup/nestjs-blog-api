import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];
    const entity: unknown = await this.dataSource
      .getRepository(repository)
      .findOne({
        where: {
          [pathToProperty ? pathToProperty : validationArguments.property]:
            pathToProperty ? value?.[pathToProperty] : value,
        },
      });

    return Boolean(entity);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is not exist`;
  }
}

export function IsExist(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      propertyName: propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [property],
      validator: IsExistConstraint,
    });
  };
}
