import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { catchError, lastValueFrom } from 'rxjs';
import { GoogleSearchResearchRequestDTO } from './dto/request/google-search-research-request.dto';
import { RobotResponseDTO } from './dto/response/robot-response.dto';
import { GoogleSearch, GoogleSearchDocument } from './google-search.schema';

@Injectable()
export class GoogleSearchService {
    constructor(
        @InjectModel(GoogleSearch.name)
        private readonly googleSearchModel: Model<GoogleSearch>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    async search(
        searchBodyDTO: GoogleSearchResearchRequestDTO
    ): Promise<GoogleSearchDocument> {
        searchBodyDTO.keywords = this._parseKeywords(searchBodyDTO.keywords);

        const data: RobotResponseDTO = await this._sendToGo(searchBodyDTO);
        const document: GoogleSearchDocument =
            await this.googleSearchModel.create({
                ...searchBodyDTO,
                results: data,
            });

        return document.save();
    }

    private async _sendToGo(
        searchBodyDTO: GoogleSearchResearchRequestDTO
    ): Promise<RobotResponseDTO> {
        const robotPort: string = this.configService.get<string>('ROBOT_PORT');

        const { data } = await lastValueFrom(
            this.httpService
                .post<RobotResponseDTO>(
                    `http://robot:${robotPort}/scraping`,
                    searchBodyDTO
                )
                .pipe(
                    catchError((error: AxiosError) => {
                        console.error(error);
                        throw error.message;
                    })
                )
        );

        return data;
    }

    private _parseKeywords(keywords: string): string {
        return keywords
            .split(';')
            .map((k: string) => k.trim())
            .join('+');
    }
}
