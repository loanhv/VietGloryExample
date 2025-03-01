import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs/database';
import { ResponseInterceptor } from '@common/interceptors';
import { AssetModule } from '@apis/asset';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AssetModule, ScheduleModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, ResponseInterceptor],
})
class AppModule {}

export { AppModule };
