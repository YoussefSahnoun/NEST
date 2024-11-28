import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TestController } from './test/test.controller';
import { TodoEntity } from './todo/entities/todo.entity';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost', //configService.get<string>('POSTGRES_HOST'),
        port: 5433, //configService.get<number>('POSTGRES_PORT'),
        username:'postgres', //configService.get<string>('POSTGRES_USER'),
        password: 'admin', //configService.get<string>('POSTGRES_PASS'),
        database: 'NestDB', //configService.get<string>('POSTGRES_DB'),
        synchronize: true,
        entities: [TodoEntity],
        autoLoadEntities: true,
      }),
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('todos');
  }
}
