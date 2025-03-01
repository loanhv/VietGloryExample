import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Location } from '@entities';

@Injectable()
class LocationRepository extends BaseRepository<Location, LocationRepository> {
    constructor(
        @InjectRepository(Location)
        repository: Repository<Location>,
    ) {
        super(Location, repository);
    }

    transactional(entityManager: EntityManager): LocationRepository {
        return this.fromEntityManager(entityManager, (repository) => new LocationRepository(repository));
    }
}

export { LocationRepository };
