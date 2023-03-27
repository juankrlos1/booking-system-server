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

    const exceptionResponse = exception.getResponse() as {
      message: string;
      errors: any[];
      statusCode: number;
    };
    const message = exceptionResponse.message || 'An error occurred';
    const errors = exceptionResponse.errors || [];

    response.status(status).json({
      statusCode: status,
      message: message,
      errors: errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
