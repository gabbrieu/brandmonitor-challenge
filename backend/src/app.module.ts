import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleSearchModule } from './google-search/google-search.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        GoogleSearchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
