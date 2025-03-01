import { autoGenerateIdFields, timeStampFields, createTableIfNotExist } from '@common/constants/database';
import { loggerHelper } from '@common/helpers';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLocation1740794668319 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: 'locations',
                    columns: [
                        ...autoGenerateIdFields,
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                        {
                            name: 'organization_id',
                            type: 'int',
                            isNullable: false,
                        },
                        ...timeStampFields,
                    ],
                }),
                createTableIfNotExist,
            );
        } catch (error) {
            loggerHelper.error(`CreateTableLocation1740794668319: ${error}`);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable('locations');
        } catch (error) {
            loggerHelper.error(`${error}`);
            throw error;
        }
    }
}
