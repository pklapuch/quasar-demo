import { APIRequest } from 'src/api/APIModels';

const relativePath = '/data';

export function mapRequest() {
  return new APIRequest(relativePath, 'GET', null, null);
}
