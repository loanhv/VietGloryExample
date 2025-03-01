import { loggerHelper } from '@common/helpers';
import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class UpdateAddFkOrganizationToLocation1740800111137 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createForeignKey(
                'locations',
                new TableForeignKey({
                    columnNames: ['organization_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'organization',
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
            const table = await queryRunner.getTable('locations');
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.includes('organization_id'));
            if (foreignKey) {
                await queryRunner.dropForeignKey('locations', foreignKey);
            }
        } catch (error) {
            loggerHelper.error(`${error}`);
            throw error;
        }
    }
}
