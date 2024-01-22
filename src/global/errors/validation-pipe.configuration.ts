import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  exceptionFactory(errors) {
    const result = errors.map((error) => {
      const messageKey = Object.keys(error.constraints)[0];

      return {
        property: error.property,
        message: error.constraints[messageKey],
      };
    });

    return new BadRequestException({ details: result });
  },
};
