import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { Asset } from './asset.entity';

@Entity('locations')
class Location extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(() => Organization, (organization) => organization.locations)
    @JoinColumn({ name: 'organization_id' })
    organization: Organization;

    @OneToMany(() => Asset, (asset) => asset.location)
    assets: Asset[];
}

export { Location };
