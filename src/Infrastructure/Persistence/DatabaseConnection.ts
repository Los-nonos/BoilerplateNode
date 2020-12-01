import { createConnection } from 'typeorm';
import { isTesting, isDevelopment, isProduction, getMode } from '../../config/mode';

export default class DatabaseConnection {
  public async getConnection(): Promise<void> {
    const db_username = process.env.DATABASE_USER;
    const db_password = process.env.DATABASE_PASSWORD;
    const db_database = process.env.DATABASE_NAME;
    const db_port = process.env.DATABASE_PORT;
    const db_host = process.env.DATABASE_HOST;

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
        migrationsTableName: 'migrations',
        migrationsRun: true,
        entities: ['./dist/Domain/Entities/*.js', './dist/Infrastructure/Auth/Token.js'],
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
        migrationsTableName: 'migrations',
        migrationsRun: true,
        entities: ['./dist/Domain/Entities/*.js', './dist/Infrastructure/Auth/Token.js'],
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
