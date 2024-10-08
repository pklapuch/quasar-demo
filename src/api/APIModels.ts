export type Headers = {
  [key: string]: string;
};

export class APIRequest {
  url: string;
  method: string;
  body?: unknown | null;
  headers?: Headers | null;

  constructor(
    url: string,
    method: string,
    body?: unknown,
    headers?: Headers | null
  ) {
    this.url = url;
    this.method = method;
    this.body = body;
    this.headers = headers;
  }
}

export class APIResponse {
  statusCode: number;
  body?: unknown | null;
  headers?: Headers | null;

  constructor(statusCode: number, body?: unknown, headers?: Headers | null) {
    this.statusCode = statusCode;
    this.body = body;
    this.headers = headers;
  }
}
