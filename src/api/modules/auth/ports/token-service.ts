export interface ITokenService {
  signAccessToken(payload: { userId: string }): Promise<string>;
  verifyAccessToken(token: string): Promise<{ userId: string }>;
}
