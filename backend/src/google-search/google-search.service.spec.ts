import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { of, throwError } from 'rxjs';
import { RobotResponseDTO } from './dto/response/robot-response.dto';
import { GoogleSearch } from './google-search.schema';
import { GoogleSearchService } from './google-search.service';

const mockGoogleSearch = {
    _id: '1',
    __v: 0,
    frequency: 2,
    keywords: 'cup',
    location: 'lang_us',
    results: [
        {
            result: 'Cup',
            timestamp: '2024-02-02T22:00:00Z',
        },
    ] as RobotResponseDTO[],
};

describe('Google search service', () => {
    let service: GoogleSearchService;
    let model: Model<GoogleSearch>;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GoogleSearchService,
                {
                    provide: HttpService,
                    useValue: {
                        post: jest.fn(),
                    },
                },
                ConfigService,
                {
                    provide: getModelToken(GoogleSearch.name),
                    useValue: Model,
                },
            ],
        }).compile();

        service = module.get<GoogleSearchService>(GoogleSearchService);
        configService = module.get<ConfigService>(ConfigService);
        model = module.get<Model<GoogleSearch>>(
            getModelToken(GoogleSearch.name)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should save a new collection', async () => {
        const robotResponse: RobotResponseDTO = {
            result: 'Cup',
            timestamp: '2024-02-02T22:00:00Z',
        };
        const response: AxiosResponse<any> = {
            headers: {},
            config: { headers: {} as AxiosRequestHeaders },
            status: 201,
            statusText: 'Created',
            data: robotResponse,
        };

        jest.spyOn(configService, 'get').mockReturnValue('3001');
        jest.spyOn(service['httpService'], 'post').mockImplementationOnce(() =>
            of(response)
        );

        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve({
                save: () => {
                    return {
                        _id: '1',
                        __v: 0,
                        frequency: 2,
                        keywords: 'cup',
                        location: 'lang_us',
                        results: [robotResponse] as RobotResponseDTO[],
                    };
                },
            } as any)
        );
        const result = await service.search({
            frequency: 2,
            keywords: 'cup',
            location: 'lang_us',
        });

        expect(result).toStrictEqual(mockGoogleSearch);
    });

    it('should throw an error when the robot service throws an error', async () => {
        console.error = jest.fn();
        jest.spyOn(configService, 'get').mockReturnValue('3001');
        jest.spyOn(service['httpService'], 'post').mockImplementation(() =>
            throwError(() => new Error('Generic error'))
        );

        service
            .search({
                frequency: 2,
                keywords: 'cup',
                location: 'lang_us',
            })
            .catch((e) => {
                expect(e).toStrictEqual('Generic error');
            });
    });
});
