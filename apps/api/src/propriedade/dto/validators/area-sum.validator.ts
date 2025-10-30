import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'areaSumConstraint', async: false })
export class AreaSumConstraintValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const object = args.object as any;
    const totalArea = object.total_area_hectares;
    const agriculturalArea = object.agricultural_area_hectares;
    const vegetationArea = object.vegetation_area_hectares;

    if (
      typeof totalArea !== 'number' ||
      typeof agriculturalArea !== 'number' ||
      typeof vegetationArea !== 'number'
    ) {
      return true;
    }

    return agriculturalArea + vegetationArea <= totalArea;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'The sum of agricultural area and vegetation area cannot exceed the total area';
  }
}

export function ValidateAreaSum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AreaSumConstraintValidator,
    });
  };
}