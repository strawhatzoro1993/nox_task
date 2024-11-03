import { DataSource } from 'typeorm';
import { configService } from './src/config/config.service';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
export default new DataSource(
  <DataSourceOptions>configService.getDatabaseConfig(),
);
