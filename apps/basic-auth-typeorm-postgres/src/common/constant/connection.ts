export const connection: Connection = {
  connectionString: 'CONNECTION_STRING',
  database: 'DATABASE',
  username: 'USERNAME',
  password: 'PASSWORD',
  port: 5432,
  host: 'HOST',
  ssl: false,
  dialect: 'postgres',
};

export type Connection = {
  connectionString: string;
  database: string;
  username: string;
  password: string;
  port: number;
  host: string;
  ssl: boolean;
  dialect: string;
};
