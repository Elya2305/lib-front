export enum Status {
  OK = 'OK',
  ERROR = 'ERROR',
  WARN = 'WARN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  AUTH_ERROR = 'AUTH_ERROR'
}

export class ApiResponse<T> {
  status: Status;
  message: string;
  body: T;
}

export class ApiPageResponse<T> {
  status: Status;
  totalPages: number;
  page: number;
  objects: T[];
}
