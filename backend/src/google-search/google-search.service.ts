import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { catchError, lastValueFrom } from 'rxjs';
import { GoogleSearchResearchRequestDTO } from './dto/request/google-search-research-request.dto';
import { GoogleSearch } from './google-search.schema';

@Injectable()
export class GoogleSearchService {
    constructor(
        @InjectModel(GoogleSearch.name)
        private readonly googleSearchModel: Model<GoogleSearch>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    async search(searchBodyDTO: GoogleSearchResearchRequestDTO) {
        const data = await this._sendToGo(searchBodyDTO);
        const created = new this.googleSearchModel(searchBodyDTO);

        return created.save();
    }

    private async _sendToGo(searchBodyDTO: GoogleSearchResearchRequestDTO) {
        const baseGoURL: string = this.configService.get<string>('BASE_GO_URL');

        const { data } = await lastValueFrom(
            this.httpService.post(`${baseGoURL}/scraping`, searchBodyDTO).pipe(
                catchError((error: AxiosError) => {
                    console.error(error);
                    throw error.message;
                })
            )
        );

        return data;
    }
}
