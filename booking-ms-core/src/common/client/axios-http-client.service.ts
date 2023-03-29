import { Injectable } from '@nestjs/common';
import { IHttpClient } from '../interfaces/http-client.interface';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosHttpClientService implements IHttpClient {
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  }

  // Implementa otros métodos según sea necesario
}
