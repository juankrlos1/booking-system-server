export interface Pagination {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  nextPage: number | null;
  prevPage: number | null;
}
