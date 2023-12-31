import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch()
export class ErrorsExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception);
    if (exception.name == 'CastError') {
      return response.status(422).json({
        statusCode: 422,
        message: exception.message,
      });
    }

    if (exception.status == 422) {
      return response.status(422).json({
        statusCode: 422,
        message: exception.message,
        validations: exception.response.message,
      });
    }

    response.status(exception.status || 500).json({
      statusCode: exception.status || 500,
      message: exception.message || 'Internal Server error',
    });
  }
}
