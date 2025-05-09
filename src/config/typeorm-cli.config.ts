import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm';
import InitSeeder from '../database/seeds/init.seeder';
import { typeormConfig } from './typeorm.config';

const options = {
  ...typeormConfig,
  // migrationsTableName: 'typeorm_migrations',
  // migrations: [__dirname + 'database/migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
