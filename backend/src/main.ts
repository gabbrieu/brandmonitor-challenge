import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    app.useGlobalPipes(new ValidationPipe({ transform: true })).enableCors();

    const config = new DocumentBuilder()
        .setTitle('Google Search')
        .setDescription('Google Search API scraping')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const API_PORT = Number(process.env.API_PORT) || 3000;
    await app.listen(API_PORT, '0.0.0.0');
}

bootstrap();
