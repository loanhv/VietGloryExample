import { autoGenerateIdFields, timeStampFields, createTableIfNotExist } from '@common/constants/database';
import { loggerHelper } from '@common/helpers';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOrganization1740794699458 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: 'organization',
                    columns: [
                        ...autoGenerateIdFields,
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                        ...timeStampFields,
                    ],
                }),
                createTableIfNotExist,
            );
        } catch (error) {
            loggerHelper.error(`CreateTableOrganization1740794699458: ${error}`);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable('organization');
        } catch (error) {
            loggerHelper.error(`${error}`);
            throw error;
        }
    }
}
