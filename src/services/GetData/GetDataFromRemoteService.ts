import { mapRequest } from './GetDataRequestMapper';
import { authHttpClient } from 'src/DIContainer/AuthHttpClientContainer';

// Returns: Promise<String>
// Throws: any Error
export async function loadDataFromRemote() {
  try {
    const request = mapRequest();
    const response = await authHttpClient(request);
    console.log(response);
  } catch (error) {
    throw error;
  }
}
