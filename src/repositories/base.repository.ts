import { BaseEntity, EntityManager, ObjectType, Repository } from 'typeorm';

abstract class BaseRepository<T extends BaseEntity, TargetRepo> extends Repository<T> {
    protected constructor(
        private readonly entityClass: ObjectType<T>,
        repository: Repository<T>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    abstract transactional(entityManager: EntityManager): TargetRepo;

    protected fromEntityManager(entityManager: EntityManager, constr: (repository: Repository<T>) => TargetRepo): TargetRepo {
        return constr(entityManager.getRepository(this.entityClass));
    }
}

export { BaseRepository };
