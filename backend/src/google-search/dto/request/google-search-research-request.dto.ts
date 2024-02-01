import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, Matches } from 'class-validator';

export class GoogleSearchResearchRequestDTO {
    @ApiProperty({
        type: String,
        description: 'Keywords to be searched splitted by semicolon',
        example: 'word1; word2',
    })
    @Matches(/\w+\;/g)
    @IsDefined()
    keywords: string;

    @ApiProperty({
        type: Number,
        description: 'Quantity of results to be saved',
        example: 2,
    })
    @IsNumber()
    @IsDefined()
    frequency: number;

    @ApiProperty({
        type: String,
        description: 'Location of research',
        example: 'Brasil',
    })
    @IsString()
    @IsDefined()
    location: string;
}
