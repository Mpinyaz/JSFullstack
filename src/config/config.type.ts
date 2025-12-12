import appConfig from './app.config';
import databaseConfig from './database.config';
export type AppConfig = ReturnType<typeof appConfig>;
export type DataBaseConfig = ReturnType<typeof databaseConfig>;

export interface AllConfigType {
  app: AppConfig;
  database: DataBaseConfig;
}
