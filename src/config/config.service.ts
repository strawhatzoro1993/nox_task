import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import * as path from 'path';
config();
const NODE_ENV = process.env.NODE_ENV;
const envFilePath = path.resolve(process.cwd(), `src/env/${NODE_ENV}.env`);
config({ path: envFilePath });

//TODO make config module and service injectable
export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getEnvironmentPath() {
    return envFilePath;
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'development';
  }

  public getDatabaseConfig() {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),
      entities: [
        'dist/src/modules/**/models/*.entity.js',
        'dist/src/modules/**/models/*.entity.d.ts',
      ],
      autoloadEntities: true,
      synchronize: true,
      migrationsTableName: 'migration',
      migrations: ['dist/src/migrations/*.ts', 'dist/src/migrations/*.js'],
    };
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return <TypeOrmModuleOptions>this.getDatabaseConfig();
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]);

export { configService };
