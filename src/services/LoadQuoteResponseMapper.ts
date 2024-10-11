import { APIResponse } from 'src/api/APIModels';
import { InvalidResponseRepresentationError } from '../models/InvalidResponseRepresentationError';

// Returns: String
// Throws: InvalidResponseRepresentation Error
export function mapResponse(response: APIResponse) {
  if (response.statusCode != 200) {
    throw new InvalidResponseRepresentationError(
      'Invalid status code: ' + response.statusCode
    );
  }

  if (response.body == null) {
    throw new InvalidResponseRepresentationError('Invalid body: null');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = response.body as [sring: any];

  if (json == null) {
    throw new InvalidResponseRepresentationError('Body is not a json');
  }

  if (json.length != 1) {
    throw new InvalidResponseRepresentationError(
      'Invalid model count: ' + json.length
    );
  }

  return json[0].quote;
}
