import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class AxiosErrorInterceptor implements NestInterceptor {
  private logger = new Logger(AxiosErrorInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: AxiosError) => {
        this.logger.error({ error });
        if (error.isAxiosError) {
          const statusCode = error.response?.status || 500;
          const message = error.response?.data || 'An error occurred';
          const errors = error.response?.data || [];

          const path = context.switchToHttp().getRequest().url;
          const timestamp = new Date().toISOString();

          const customError = {
            statusCode,
            message,
            errors,
            path,
            timestamp,
          };

          return throwError(
            () => new HttpException({ message, errors }, statusCode),
          );
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
