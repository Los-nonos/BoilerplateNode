import { createConnection } from 'typeorm';
import { isTesting, isDevelopment, isProduction, getMode } from '../../config/mode';
import {config} from '../../config/config';

export default class DatabaseConnection {
  public async getConnection(): Promise<void> {
    const db_username = config('database.credentials.username');
    const db_password = config('database.credentials.password');
    const db_database = config('database.database');
    const db_port = config('database.port');
    const db_host = config('database.host');
    const db_migrations_table = config('database.migration_table');

    console.log(`Mode: ${getMode()}`);
    console.log(`Host: ${db_host}`);

    if (isProduction()) {
      await createConnection({
        type: 'mysql',
        host: db_host,
        port: Number(db_port),
        username: db_username,
        password: db_password,
        database: db_database,
        synchronize: false,
        logging: false,
        migrations: ['./dist/Persistence/TypeORM/Migrations/*.js'],
        migrationsTableName: db_migrations_table,
        migrationsRun: true,
        entities: ['./dist/Domain/Entities/*.js'],
        cli: {
          migrationsDir: './TypeORM/Migrations',
        },
      });
    } else if (isDevelopment()) {
      await createConnection({
        type: 'mysql',
        host: db_host,
        port: Number(db_port),
        username: db_username,
        password: db_password,
        database: db_database,
        synchronize: false,
        logging: true,
        migrations: ['./dist/Infrastructure/Persistence/TypeORM/Migrations/*.js'],
        migrationsTableName: db_migrations_table,
        migrationsRun: true,
        entities: ['./dist/Domain/Entities/*.js'],
        cli: {
          migrationsDir: './TypeORM/Migrations',
        },
      }).catch(err => console.log('error connection to db: ' + err));
    } else if (isTesting()) {
      await createConnection({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: false,
        migrationsRun: true,
        migrations: ['./TypeORM/MigrationsTests/*.ts'],
        migrationsTableName: 'migrations',
        logging: false,
        entities: ['./src/Domain/Entities/*.ts'],
        cli: {
          migrationsDir: './TypeORM/MigrationsTests',
          entitiesDir: './src/Domain/Entities',
        },
      });
    } else {
      throw new Error(`Not found connection db with current credentials`);
    }
  }
}
