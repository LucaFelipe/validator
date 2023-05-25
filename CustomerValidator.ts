import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isCustomersSolicitationValid', async: false })
class IsCustomersSolicitationsValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;

    if (args.property === 'solicitationId') {
      return object.solicitationId && typeof object.solicitationId === 'string';
    }

    if (args.property === 'customerId') {
      return object.customerId && typeof object.customerId === 'string';
    }

    if (args.property === 'description') {
      if (!object.description) {
        return true;
      }
      return typeof object.description === 'string' && object.description.length >= 30 && object.description.length <= 300;
    }

    if (args.property === 'category') {
      if (!object.category) {
        return true;
      }
      return typeof object.category === 'string';
    }

    if (args.property === 'dueDate') {
      if (!object.dueDate) {
        return true;
      }
      return typeof object.dueDate === 'string';
    }

    if (args.property === 'status') {
      if (!object.status) {
        return true;
      }
      return typeof object.status === 'string';
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { property } = args;

    if (property === 'description') {
      return 'The description must be a string between 30 and 300 characters long.';
    }

    return 'Invalid value.';
  }
}

export function IsCustomersSolicitationValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCustomersSolicitationValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCustomersSolicitationsValidConstraint,
    });
  };
}
