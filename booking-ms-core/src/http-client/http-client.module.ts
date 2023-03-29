import { Module } from '@nestjs/common';
import { AxiosHttpClientService } from '../common/client/axios-http-client.service';

@Module({
  providers: [
    {
      provide: 'IHttpClient',
      useClass: AxiosHttpClientService,
    },
  ],
  exports: ['IHttpClient'],
})
export class HttpClientModule {}
