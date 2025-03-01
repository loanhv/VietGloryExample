import { Asset, Location } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AssetRepository, LocationRepository } from '@repositories';

@Module({
    imports: [TypeOrmModule.forFeature([Asset, Location])],
    controllers: [AssetController],
    providers: [AssetService, AssetRepository, LocationRepository],
    exports: [AssetRepository, AssetService],
})
class AssetModule {}

export { AssetModule };
