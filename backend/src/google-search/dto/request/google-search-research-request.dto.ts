import { PickType } from '@nestjs/swagger';
import { GoogleSearch } from '../../google-search.schema';

export class GoogleSearchResearchRequestDTO extends PickType(GoogleSearch, [
    'keywords',
    'frequency',
    'location',
] as const) {}
