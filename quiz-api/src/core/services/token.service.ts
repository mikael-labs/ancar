export abstract class TokenService {
  abstract encode<T extends string | object = any>(
    payload: T,
  ): string | Promise<string>;
  abstract decode<T extends string | object = any>(token: string): T;
}
