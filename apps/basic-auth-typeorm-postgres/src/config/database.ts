import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'nestjs',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/config/migrations/*.js'], // 3
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
