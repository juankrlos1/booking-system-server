import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let message: string;
    let errors = [];

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      const { message: exceptionMessage, errors: exceptionErrors } =
        exceptionResponse as { message: string | string[]; errors?: any[] };

      if (Array.isArray(exceptionMessage)) {
        message = 'Bad request';
        errors = exceptionMessage;
      } else {
        message = exceptionMessage;
        errors = exceptionErrors || [];
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      errors: errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
