import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}
export const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  // entities: ['dist/src/modules/**/*.entity.{ts,js}'],
  // migrations: ['dist/src/migrations/*.{ts,js}'],
  entities: [__dirname + '/src/modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/src/migrations/*.{ts,js}'],
  synchronize: true,
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/modules/**/*.entity.{ts,js}',
    migrationsDir: 'src/migrations',
  },
};

export default OrmConfig;
