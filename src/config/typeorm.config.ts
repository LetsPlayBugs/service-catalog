import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConfigModule.forRoot({
  envFilePath: [process.env.NODE_ENV === 'test' ? '.env.test' : '.env'],
});

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'postgres',
  autoLoadEntities: true,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  // In reality, I would not be using synchronize.
  // This is only for demonstration/quick development purposes.
  synchronize: true,
  // ````
};

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => typeormConfig,
);
