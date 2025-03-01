import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
import { ApiOperation } from '@nestjs/swagger';
import { Asset } from '@entities';
import { CreateAssetDto, UpdateAssetDto } from './dto';

@Controller('asset')
class AssetController {
    constructor(private readonly assetService: AssetService) {}

    @ApiOperation({ summary: 'Get All Assets' })
    @Get()
    getAllAssets(): Promise<Asset[]> {
        return this.assetService.getAllAssets();
    }

    @ApiOperation({ summary: 'Get Asset Information' })
    @Get(':id')
    getAssetById(@Param('id') id: number): Promise<Asset | null> {
        return this.assetService.getAssetById(id);
    }

    @ApiOperation({ summary: 'Create Asset' })
    @Post()
    createAsset(@Body() createAssetDto: CreateAssetDto): Promise<Asset> {
        return this.assetService.createAsset(createAssetDto);
    }

    @ApiOperation({ summary: 'Update Asset' })
    @Patch(':id')
    updateAsset(@Param('id') id: number, @Body() updateAssetDto: UpdateAssetDto): Promise<Asset> {
        return this.assetService.updateAsset(id, updateAssetDto);
    }

    @ApiOperation({ summary: 'Delete Asset' })
    @Delete(':id')
    deleteAsset(@Param('id') id: number): Promise<void> {
        return this.assetService.deleteAsset(id);
    }
}

export { AssetController };
