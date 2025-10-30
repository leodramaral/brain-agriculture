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
    const totalArea = object.total_farm_area_hectares;
    const arableArea = object.arable_area_hectares;
    const vegetationArea = object.vegetation_area_hectares;

    if (
      typeof totalArea !== 'number' ||
      typeof arableArea !== 'number' ||
      typeof vegetationArea !== 'number'
    ) {
      return true;
    }

    return arableArea + vegetationArea <= totalArea;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'The sum of arable area and vegetation area cannot exceed the total farm area';
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