import { loggerHelper } from '@common/helpers';
import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class UpdateAddFkLocationToAsset1740800290151 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createForeignKey(
                'assets',
                new TableForeignKey({
                    columnNames: ['location_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'locations',
                    onDelete: 'CASCADE',
                }),
            );
        } catch (error) {
            loggerHelper.error(`${error}`);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            const table = await queryRunner.getTable('assets');
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.includes('location_id'));
            if (foreignKey) {
                await queryRunner.dropForeignKey('assets', foreignKey);
            }
        } catch (error) {
            loggerHelper.error(`${error}`);
            throw error;
        }
    }
}
