import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isServicesValid', async: false })
class IsServicesValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;

    if (args.property === 'serviceId') {
      return object.serviceId && typeof object.serviceId === 'string';
    }
    if (args.property === 'ownerId') {
        return object.ownerId && typeof object.ownerId === 'string';
      }

    if (args.property === 'name') {
      return object.name && typeof object.name === 'string';
    }

    if (args.property === 'category') {
      if (!object.category) {
        return true;
      }
      return typeof object.category === 'string';
    }

    if (args.property === 'rating') {
      if (!object.rating) {
        return true;
      }
      return typeof object.rating === 'string';
    }

    return true;
  }

}

export function IsServicesValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isServicesValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsServicesValidConstraint,
    });
  };
}
