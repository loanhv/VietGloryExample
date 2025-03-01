import { CreateDateColumn, PrimaryGeneratedColumn, BaseEntity as TypeormBaseEntity, UpdateDateColumn } from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'datetime',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
