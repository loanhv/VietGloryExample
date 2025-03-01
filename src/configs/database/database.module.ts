import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { loggerHelper } from '@common/helpers';
import { seedData } from './seeds';
import { Asset, Organization, Location } from '@entities';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT) || 3306,
                username: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || 'pwd',
                database: process.env.DB_NAME || 'db',
                entities: [Asset, Location, Organization],
                migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
                synchronize: false,
                autoLoadEntities: true,
                migrationsTableName: 'migrations',
            }),
        }),
    ],
})
class DatabaseModule implements OnModuleInit {
    constructor(private readonly dataSource: DataSource) {}

    async onModuleInit() {
        if (process.env.NODE_ENV !== 'prd') {
            try {
                await this.dataSource.runMigrations();
                await seedData.run(this.dataSource);
            } catch (error) {
                loggerHelper.error(`Migration Error: ${error}`);
            }
        }
    }
}

export { DatabaseModule };
