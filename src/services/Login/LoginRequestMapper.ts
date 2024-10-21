import { APIRequest, Headers } from 'src/api/APIModels';
import { LoginRequest } from 'src/models/LoginRequest';

const clientID = process.env.API_CLIENT_ID as string;
const authURL = process.env.API_AUTH_URL as string;

export function mapRequest(request: LoginRequest) {
  const body = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: request.email,
      PASSWORD: request.password,
    },
    ClientId: clientID,
  };

  const headers: Headers = {
    'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    'Content-Type': 'application/x-amz-json-1.1',
  };

  return new APIRequest(authURL, 'POST', body, headers);
}
