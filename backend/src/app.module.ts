import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './app.entity';
import { TaskRepository } from './app.repository';
import { TaskService } from './app.service';
import { TaskController } from './app.controller';
import config from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Task, TaskRepository]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
