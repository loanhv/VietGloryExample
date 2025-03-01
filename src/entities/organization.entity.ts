import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Location } from './location.entity';

@Entity('organization')
class Organization extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(() => Location, (location) => location.organization)
    @JoinColumn({ name: 'organization_id' })
    locations: Location[];
}

export { Organization };
