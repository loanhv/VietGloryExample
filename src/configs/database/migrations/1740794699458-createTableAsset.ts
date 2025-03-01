import { autoGenerateIdFields, createTableIfNotExist, timeStampFields } from '@common/constants/database';
import { loggerHelper } from '@common/helpers';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAsset1740794563968 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: 'assets',
                    columns: [
                        ...autoGenerateIdFields,
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                        {
                            name: 'type',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                        {
                            name: 'location_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'status',
                            type: "ENUM('actived', 'unactive')",
                            isNullable: false,
                        },
                        ...timeStampFields,
                    ],
                }),
                createTableIfNotExist,
            );
        } catch (error) {
            loggerHelper.error(`CreateTableAsset1740794563968: ${error}`);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable('assets');
        } catch (error) {
            loggerHelper.error(`${error}`);
            throw error;
        }
    }
}
