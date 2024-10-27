export class LoginError extends Error {
  constructor(localizedMessage: string) {
    super(localizedMessage);
  }
}
