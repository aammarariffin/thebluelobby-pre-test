import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from './app.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'task',
  entities: [Task],
  synchronize: true,
};

export default config;
