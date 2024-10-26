import { APIRequest } from 'src/Domain/Shared/APIModels';

const relativePath = '/data';

export function mapRequest() {
  return new APIRequest(relativePath, 'GET', null, null);
}
