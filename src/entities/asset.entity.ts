import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Location } from './location.entity';

@Entity('assets')
class Asset extends BaseEntity {
    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: 'enum', default: 'unactive', enum: ['actived', 'unactive'] })
    status: 'actived' | 'unactive';

    @ManyToOne(() => Location, (location) => location.assets)
    @JoinColumn({ name: 'location_id' })
    location: Location;
}

export { Asset };
