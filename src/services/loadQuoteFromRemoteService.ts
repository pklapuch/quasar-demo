import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';

// Returns: String
// Throws: any Error
export const loadQuoteFromRemoteService = async function () {
  try {
    const response = await api.get('/v1/quotes');
    return mapResponse(response.data, response.status, response.headers);
  } catch (error) {
    throw error;
  }
};

function mapResponse(data, status, headers) {
  console.log(status);
  console.log(data);
  console.log(headers);

  if (status != 200) {
    throw Error('Invalid Response Representation');
  }

  return data[0].quote;
}
