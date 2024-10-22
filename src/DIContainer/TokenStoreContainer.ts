import { LoginResponse } from 'src/models/LoginResponse';

// - Load Token

export const loadTokenService = function (): LoginResponse {
  return _loadTokenService();
};

export function registerLoadTokenService(block: () => LoginResponse) {
  _loadTokenService = block;
}

let _loadTokenService = function (): LoginResponse {
  throw Error('Dependency not registered');
};

// - Store Token

export const storeTokenService = function (response: LoginResponse) {
  return _storeTokenService(response);
};

export function registerStoreTokenService(
  block: (response: LoginResponse) => void
) {
  _storeTokenService = block;
}

let _storeTokenService = function (response: LoginResponse): void {
  throw Error('Dependency not registered: ' + response);
};
