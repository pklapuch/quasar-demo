import { APIResponse } from 'src/Domain/Shared/APIModels';
import { LoginResponse } from 'src/Domain/Login/LoginResponse';
import { InvalidResponseRepresentationError } from 'src/Domain/Shared/InvalidResponseRepresentationError';

interface IDictionary {
  [index: string]: unknown;
}

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
  const json = response.body as IDictionary;

  if (json == null) {
    throw new InvalidResponseRepresentationError('Body is not a json');
  }

  const auth = json['AuthenticationResult'] as IDictionary;
  if (auth == null) {
    throw new InvalidResponseRepresentationError(
      'Response json does not contain Auth'
    );
  }

  const IdToken = auth['IdToken'] as string;
  const refreshToken = auth['RefreshToken'] as string;

  return new LoginResponse(IdToken, refreshToken);
}
