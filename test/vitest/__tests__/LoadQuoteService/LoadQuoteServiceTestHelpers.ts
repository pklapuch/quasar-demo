export class TestBundle {
  body: unknown;
  quote: string;

  constructor(body: unknown, quote: string) {
    this.body = body;
    this.quote = quote;
  }
}

export function responseWithOneQuoteTestBundle() {
  const body = [
    {
      quote: 'mock quote',
    },
  ];

  const quote = 'mock quote';

  return new TestBundle(body, quote);
}

export const resposeDataWithEmptyJson: [string: unknown] = [{}];

export const successStatusCode = 200;

export const failureStatusCodes = [201, 204, 300, 400, 404, 500, 501];
