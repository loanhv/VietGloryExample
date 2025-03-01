import { TableColumnOptions } from 'typeorm';

export const createTableIfNotExist = true;

export const autoGenerateIdFields: TableColumnOptions[] = [
    {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
    },
];

export const timeStampFields: TableColumnOptions[] = [
    {
        name: 'created_at',
        type: 'datetime',
        isNullable: true,
        default: 'CURRENT_TIMESTAMP',
    },
    {
        name: 'updated_at',
        type: 'datetime',
        isNullable: true,
        default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
];
