import { api } from 'boot/axios';

// Returns: String
// Throws: Error
export const loadQuoteFromRemoteService = async function () {
  const response = await api.get('/v1/quotes');
  console.log(response.data);
  return response.data[0].quote;
};
