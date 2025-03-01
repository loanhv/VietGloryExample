import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Organization } from '@entities';

@Injectable()
class OrganizationRepository extends BaseRepository<Organization, OrganizationRepository> {
    constructor(
        @InjectRepository(Organization)
        repository: Repository<Organization>,
    ) {
        super(Organization, repository);
    }

    transactional(entityManager: EntityManager): OrganizationRepository {
        return this.fromEntityManager(entityManager, (repository) => new OrganizationRepository(repository));
    }
}

export { OrganizationRepository };
