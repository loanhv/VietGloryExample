import { INestApplication, Module } from '@nestjs/common';
import { SwaggerModule as SwaggerModuleBase, DocumentBuilder } from '@nestjs/swagger';

@Module({})
class SwaggerModule {
    static setup(app: INestApplication): void {
        const config = new DocumentBuilder()
            .setTitle('API Resource NestJS')
            .setDescription('API Resource NestJS Descriptions by LoanHV')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModuleBase.createDocument(app, config);
        SwaggerModuleBase.setup('api', app, document);
    }
}

export { SwaggerModule };
