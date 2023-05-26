import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ConfigurationService,
  ConfigurationServiceImpl,
} from './configuration.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
