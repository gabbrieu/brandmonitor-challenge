import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleSearchController } from './google-search.controller';
import { GoogleSearch, GoogleSearchSchema } from './google-search.schema';
import { GoogleSearchService } from './google-search.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: GoogleSearchSchema, name: GoogleSearch.name },
        ]),
        HttpModule,
    ],
    controllers: [GoogleSearchController],
    providers: [GoogleSearchService],
})
export class GoogleSearchModule {}
