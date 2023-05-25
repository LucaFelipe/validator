import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

@ValidatorConstraint({ name: 'isCompanyAvailableValid', async: false })
class IsCompanyAvailableValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;

    if (args.property === 'company') {
      return object.company && typeof object.company === 'string';
    }

    if (args.property === 'userId') {
      return object.userId && typeof object.userId === 'string';
    }

    if (args.property === 'cnpj') {
      if (!object.cnpj) {
        return true;
      }
      return typeof object.cnpj === 'string' && cnpjPattern.test(object.cnpj);
    }

    if (args.property === 'companyName') {
      if (!object.companyName) {
        return true;
      }
      return typeof object.companyName === 'string';
    }

    if (args.property === 'tradingName') {
      if (!object.tradingName) {
        return true;
      }
      return typeof object.tradingName === 'string';
    }

    if (args.property === 'country') {
      if (!object.country) {
        return true;
      }
      return typeof object.country === 'string';
    }
    
    if (args.property === 'state') {
      if (!object.state) {
        return true;
      }
      return typeof object.state === 'string';
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { property } = args;

    if (property === 'cnpj') {
      return 'The CNPJ must be in the format XX.XXX.XXX/YYYY-ZZ.';
    }

    return 'Invalid value.';
  }
}

export function IsCompanyAvailableValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCompanyAvailableValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCompanyAvailableValidConstraint,
    });
  };
}
