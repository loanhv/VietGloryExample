import { AppModule } from 'src/app';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@configs/swagger';
import { ResponseInterceptor } from '@common/interceptors';
import { loggerHelper } from '@common/helpers';

async function bootstrap() {
    try {
        const port = process.env.PORT ?? 3000;
        const app = await NestFactory.create(AppModule);

        SwaggerModule.setup(app);
        app.useGlobalInterceptors(new ResponseInterceptor());

        await app.listen(port);
        loggerHelper.log(`Application running on: http://localhost:${port}/api`);
    } catch (err) {
        if (err instanceof Error) {
            loggerHelper.error('BOOT_APP_ERROR', err);
        }
    }
}

bootstrap();
