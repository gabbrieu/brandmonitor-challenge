import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { GoogleSearchResearchRequestDTO } from './dto/request/google-search-research-request.dto';
import { GoogleSearchService } from './google-search.service';
import { GoogleSearch, GoogleSearchDocument } from './google-search.schema';

@ApiTags('Google Search')
@Controller('google-search')
@ApiExtraModels(GoogleSearch)
export class GoogleSearchController {
    constructor(private readonly googleSearchService: GoogleSearchService) {}

    @Post()
    @ApiOperation({
        summary:
            'Do a research on google and saves the title results based on body properties',
    })
    @ApiResponse({
        status: 201,
        description: 'The operation went well without any problems',
    })
    @ApiResponse({
        status: 400,
        description: 'Problem with body sent',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal problem',
    })
    search(
        @Body() searchBodyDTO: GoogleSearchResearchRequestDTO
    ): Promise<GoogleSearchDocument> {
        return this.googleSearchService.search(searchBodyDTO);
    }
}
