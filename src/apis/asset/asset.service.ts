import { databaseHelper } from '@common/helpers';
import { Asset } from '@entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AssetRepository, LocationRepository } from '@repositories';
import { EntityManager } from 'typeorm';
import { CreateAssetDto, UpdateAssetDto } from './dto';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
class AssetService {
    constructor(
        private readonly assetRepository: AssetRepository,
        private readonly locationRepository: LocationRepository,
        private readonly entityManager: EntityManager,
    ) {}

    private transactionalRepositories(entityManager: EntityManager) {
        return {
            assetRepository: this.assetRepository.transactional(entityManager),
        };
    }

    async getAllAssets(): Promise<Asset[]> {
        try {
            return await this.assetRepository.find({
                relations: ['location'],
            });
        } catch (error) {
            console.log({ error });
            throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    async getAssetById(id: number): Promise<Asset | null> {
        try {
            return await this.assetRepository.findOneBy({ id });
        } catch (error) {
            throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    async createAsset(dto: CreateAssetDto): Promise<Asset> {
        return await this.entityManager
            .transaction(async (em) => {
                return await this.createAssetInternal(dto, em);
            })
            .catch((err) => {
                if (err instanceof HttpException) {
                    throw err;
                }
                if (databaseHelper.isDatabaseError(err)) {
                    throw new HttpException('Database Error!', HttpStatus.BAD_REQUEST);
                }
                throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                    cause: err,
                });
            });
    }

    async createAssetInternal(dto: CreateAssetDto, entityManager: EntityManager): Promise<Asset> {
        try {
            const { assetRepository } = this.transactionalRepositories(entityManager);

            const asset = assetRepository.create(dto);
            return await this.assetRepository.save(asset);
        } catch (error) {
            throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    async updateAsset(id: number, dto: UpdateAssetDto): Promise<Asset> {
        return await this.entityManager
            .transaction(async (em) => {
                return await this.updateAssetInternal(id, dto, em);
            })
            .catch((err) => {
                if (err instanceof HttpException) {
                    throw err;
                }
                if (databaseHelper.isDatabaseError(err)) {
                    throw new HttpException('Database Error!', HttpStatus.BAD_REQUEST);
                }
                throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                    cause: err,
                });
            });
    }

    async updateAssetInternal(id: number, dto: UpdateAssetDto, entityManager: EntityManager): Promise<Asset> {
        try {
            const { assetRepository } = this.transactionalRepositories(entityManager);
            const dataExisted = await assetRepository.findOne({ where: { id } });

            if (!dataExisted) throw new HttpException(`Not Found ${id}!`, HttpStatus.BAD_REQUEST);

            await assetRepository.update(id, dto);
            return await assetRepository.findOne({ where: { id } });
        } catch (error) {
            throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    async deleteAsset(id: number): Promise<void> {
        return await this.entityManager
            .transaction(async (em) => {
                return await this.deleteAssetInternal(id, em);
            })
            .catch((err) => {
                if (err instanceof HttpException) {
                    throw err;
                }
                if (databaseHelper.isDatabaseError(err)) {
                    throw new HttpException('Database Error!', HttpStatus.BAD_REQUEST);
                }
                throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                    cause: err,
                });
            });
    }

    async deleteAssetInternal(id: number, entityManager: EntityManager): Promise<void> {
        try {
            const { assetRepository } = this.transactionalRepositories(entityManager);

            const dataReq = assetRepository.findOneBy({ id });

            if (dataReq) {
                await assetRepository.delete(id);
                return;
            } else {
                throw new HttpException(`Not Found ${id}!`, HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    @Cron('0 0 * * *')
    async syncDataAsset(): Promise<void> {
        try {
            const { data } = await axios.get('https://669ce22d15704bb0e304842d.mockapi.io/assets');

            for (const asset of data) {
                if (asset.status != 'actived') continue;

                const locationExists = await this.locationRepository.findOneBy({
                    id: asset.location_id,
                });

                if (!locationExists) continue;

                const createdAt = new Date(asset.createdAt);
                if (createdAt > new Date()) continue;

                const assetReq = {
                    name: asset.serial,
                    type: asset.type,
                    location: locationExists,
                    status: asset.status,
                };

                const existingAsset = await this.assetRepository.findOneBy({ id: asset.id });
                if (existingAsset) {
                    await this.assetRepository.update(existingAsset.id, assetReq);
                } else {
                    await this.assetRepository.save(assetReq);
                }
            }
            return;
        } catch (error) {
            throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }
}

export { AssetService };
