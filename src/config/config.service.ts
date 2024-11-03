import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import * as path from 'path';
config();
const NODE_ENV = process.env.NODE_ENV;
const envFilePath = path.resolve(process.cwd(), `src/env/${NODE_ENV}.env`);
config({ path: envFilePath });
export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
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

      entities: ['src/modules/**/models/*.entity.ts'],

      migrationsTableName: 'migration',

      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      ssl: this.isProduction(),
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
