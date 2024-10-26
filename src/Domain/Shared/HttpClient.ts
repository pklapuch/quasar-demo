import { APIRequest } from 'src/Domain/Shared/APIModels';
import { APIResponse } from 'src/Domain/Shared/APIModels';

export interface HttpClient {
  execute(request: APIRequest): Promise<APIResponse>;
}
