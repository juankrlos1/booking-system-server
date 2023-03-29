import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHttpClient {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
}
