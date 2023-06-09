export abstract class CryptoService {
  abstract encode(value: string): string | Promise<string>;
  abstract verify(value: string, hash: string): boolean | Promise<boolean>;
}
