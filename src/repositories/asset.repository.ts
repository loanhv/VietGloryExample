import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Asset } from '@entities';

@Injectable()
class AssetRepository extends BaseRepository<Asset, AssetRepository> {
    constructor(
        @InjectRepository(Asset)
        repository: Repository<Asset>,
    ) {
        super(Asset, repository);
    }

    transactional(entityManager: EntityManager): AssetRepository {
        return this.fromEntityManager(entityManager, (repository) => new AssetRepository(repository));
    }
}

export { AssetRepository };
