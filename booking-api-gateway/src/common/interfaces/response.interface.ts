import { Pagination } from './pagination.interface';

export interface ApiResponse {
  statusCode: number;
  message: string;
  data: {
    items: any[];
    pagination: Pagination;
  };
}
