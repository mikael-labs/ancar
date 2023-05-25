import { Module } from '@nestjs/common';

import { AuthModule } from './infra/modules/auth/auth.module';
import { ConfigurationModule } from './infra/modules/configuration/configuration.module';
import { QuizzesModule } from './infra/modules/quizzes/quizzes.module';
import { RepositoriesModule } from './infra/modules/repositories/repositories.module';
import { ServicesModule } from './infra/modules/services/services.module';
import { UsersModule } from './infra/modules/users/users.module';

@Module({
  imports: [
    ConfigurationModule,
    RepositoriesModule,
    ServicesModule,
    UsersModule,
    QuizzesModule,
    AuthModule,
  ],
})
export class AppModule {}
