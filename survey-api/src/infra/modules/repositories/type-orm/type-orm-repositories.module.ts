import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import {
  QuizAnswerRepository,
  UserRepository,
  QuizRepository,
} from 'src/core/data';

import { TypeORMUserRepository } from './user.repository';
import { UserEntity } from './entities/user';
import { TypeORMQuizRepository } from './quiz.repository';
import { QuizEntity } from './entities/quiz';
import { QuestionEntity } from './entities/question';
import { AnswerEntity } from './entities/answer';
import { QuizAnswerEntity } from './entities/quiz-answer';

import { TypeORMUQuizAnswerRepository } from './user-quiz.repository';

import { ConfigurationModule } from '../../configuration/configuration.module';
import { ConfigurationService } from '../../configuration/configuration.service';

const entities = [
  UserEntity,
  AnswerEntity,
  QuestionEntity,
  QuizEntity,
  QuizAnswerEntity,
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
    { provide: QuizAnswerRepository, useClass: TypeORMUQuizAnswerRepository },
  ],
  exports: [UserRepository, QuizRepository, QuizAnswerRepository],
})
export class TypeORMRepositoriesModule {}
