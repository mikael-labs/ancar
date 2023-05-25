import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';

export abstract class ConfigurationService {
  abstract getDBHost(): string;
  abstract getDBPort(): number;
  abstract getDBUsername(): string;
  abstract getDBPassword(): string;
  abstract getTokenSecret(): string;
}

@Injectable()
export class ConfigurationServiceImpl implements ConfigurationService {
  constructor(private _configService: ConfigService) {}

  getTokenSecret(): string {
    return this._configService.getOrThrow('TOKEN_SECRET');
  }

  getDBHost(): string {
    return this._configService.getOrThrow('DB_HOST');
  }

  getDBPort(): number {
    return parseInt(this._configService.getOrThrow('DB_PORT'));
  }

  getDBUsername(): string {
    return this._configService.getOrThrow('DB_USERNAME');
  }

  getDBPassword(): string {
    return this._configService.getOrThrow('DB_PASSWORD');
  }
}
