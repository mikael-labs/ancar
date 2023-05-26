import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CryptoService } from 'src/core/services';

@Injectable()
export class CryptoServiceImpl implements CryptoService {
  // TODO: Extract to configuration
  private saltRounds = 10;

  encode(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  verify(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
