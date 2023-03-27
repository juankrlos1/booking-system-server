import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from '../interfaces/axios.response';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  private logger = new Logger(AxiosExceptionFilter.name);
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.debug(
      'Response axios error: ' + JSON.stringify(exception.response),
    );

    const statusCode = exception.response?.status || 500;
    const data = exception.response?.data as AxiosErrorResponseData;
    const message = data?.message || 'An error occurred';
    const errors = data?.errors  || [];

    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      errors: errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
