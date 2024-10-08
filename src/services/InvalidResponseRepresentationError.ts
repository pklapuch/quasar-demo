export class InvalidResponseRepresentationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidResponseRepresentation';
  }
}
