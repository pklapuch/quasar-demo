export interface OAuth2TokenProvider {
  getAccessToken(): string;
  refreshAccessToken(): Promise<string>;
}
