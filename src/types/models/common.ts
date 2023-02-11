export interface ResponseDataApi<T> {
  response: { data: T };
}

export interface ResponseApi<T> {
  data: T;
}

export interface ListResponseFilter<T> {
  data: { results: T[]; count?: number; order?: T[] };
}

export interface PaginationResponse<T> {
  response: {
    data: { count: number; results: T[]; next: string; previous: string };
  };
}

export interface SuccessResponse<T> {
  status: number;
  response: T;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface PostResponse<T> {
  success?: SuccessResponse<T>;
  error?: ErrorResponse;
}
