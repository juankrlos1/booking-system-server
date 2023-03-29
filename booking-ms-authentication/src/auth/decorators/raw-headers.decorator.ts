import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().rawHeaders;
    console.log('Headers:', headers);

    return headers;
  },
);
