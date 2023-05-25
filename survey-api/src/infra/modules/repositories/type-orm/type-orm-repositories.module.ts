import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UserRepository } from 'src/core/data/usuario.repository';
import { TypeORMUserRepository } from './user.repository';
import { UserEntity } from './entities/user';
import { TypeORMQuizRepository } from './quiz.repository';
import { QuizRepository } from 'src/core/data/quiz.repository';
import { QuizEntity } from './entities/quiz';
import { QuestionEntity } from './entities/question';
import { AnswerEntity } from './entities/answer';
import { UserQuizRepository } from 'src/core/data/user-quiz.repository';
import { TypeORMUserQuizRepository } from './user-quiz.repository';
import { UserQuizAnswerEntity } from './entities/user-quiz-answer';
import { ConfigurationModule } from '../../configuration/configuration.module';
import { ConfigurationService } from '../../configuration/configuration.service';

const entities = [
  UserEntity,
  AnswerEntity,
  QuestionEntity,
  QuizEntity,
  UserQuizAnswerEntity,
];

const getTypeORMConfig = (
  configService: ConfigurationService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.getDBHost(),
  port: configService.getDBPort(),
  username: configService.getDBUsername(),
  password: configService.getDBPassword(),
  entities,
  synchronize: true,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: getTypeORMConfig,
      dataSourceFactory: async (options) => {
        if (!options) throw new Error('No options provided for TypeORMModule');

        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [],
  providers: [
    { provide: UserRepository, useClass: TypeORMUserRepository },
    { provide: QuizRepository, useClass: TypeORMQuizRepository },
    { provide: UserQuizRepository, useClass: TypeORMUserQuizRepository },
  ],
  exports: [UserRepository, QuizRepository, UserQuizRepository],
})
export class TypeORMRepositoriesModule {}
