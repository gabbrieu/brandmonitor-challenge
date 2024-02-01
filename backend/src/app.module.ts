import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleSearchModule } from './google-search/google-search.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '../../.env',
        }),
        MongooseModule.forRoot(`mongodb://mongo:27017`),
        GoogleSearchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
