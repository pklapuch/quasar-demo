import { APIRequest } from 'src/api/APIModels';

const relativePath = '/v1/quotes';

export function mapRequest() {
  return new APIRequest(relativePath, 'GET', null, null);
}
