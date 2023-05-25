import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import CryptoService from 'src/core/services/crypto.service';
import { TokenService } from 'src/core/services/token.service';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { CryptoServiceImpl } from './crypto.service';
import { JwtTokenService } from './jwt-token.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        secret: configService.getTokenSecret(),
        signOptions: { expiresIn: `${60 * 60 * 24}s` },
      }),
    }),
  ],
  providers: [
    { provide: CryptoService, useClass: CryptoServiceImpl },
    { provide: TokenService, useClass: JwtTokenService },
  ],
  exports: [CryptoService, TokenService],
})
export class ServicesModule {}
