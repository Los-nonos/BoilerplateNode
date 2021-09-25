import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class security1605973646399 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isNullable: false,
          isGenerated: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'surname',
          type: 'varchar',

        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'emailHashVerified',
          type: 'tinyint',
        }
      ]
    }));

    await queryRunner.createTable(new Table({
      name: 'token_logins',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isNullable: false,
          isGenerated: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userId',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'hash',
          type: 'varchar',
        }
      ]
    }));

    await queryRunner.createForeignKey('token_logins', new TableForeignKey({
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token_logins');
    await queryRunner.dropTable('users');
  }

}
