import { Global, Module } from '@nestjs/common';
import { TypeORMRepositoriesModule } from './type-orm/type-orm-repositories.module';

@Global()
@Module({
  imports: [TypeORMRepositoriesModule],
  exports: [TypeORMRepositoriesModule],
})
export class RepositoriesModule {}
