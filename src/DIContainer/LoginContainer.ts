export class LoginRequest {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export const loginService = async function (
  request: LoginRequest
): Promise<void> {
  return await _loginService(request);
};

export function registerLoginService(
  block: (request: LoginRequest) => Promise<void>
) {
  _loginService = block;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let _loginService = async function (request: LoginRequest): Promise<void> {
  throw Error('Dependency not registered');
};