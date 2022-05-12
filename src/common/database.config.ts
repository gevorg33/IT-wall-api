import { ConnectionOptions } from 'typeorm';
export const DatabaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations//*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
};

export default DatabaseConfig;
