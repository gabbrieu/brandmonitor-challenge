import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RobotResponseDTO } from './dto/response/robot-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsDefined,
    IsNumber,
    IsString,
    Matches,
} from 'class-validator';

@Schema()
export class GoogleSearch {
    @Prop({ required: true })
    @ApiProperty({
        type: Number,
        description: 'Quantity of results to be saved',
        example: 2,
    })
    @IsNumber()
    @IsDefined()
    frequency: number;

    @Prop({ required: true })
    @ApiProperty({
        type: String,
        description: 'Keywords to be searched splitted by semicolon',
        example: 'word1; word2',
    })
    @Matches(/^([^\s;]+)(?:;([^\s;]+))*?$/g)
    @IsDefined()
    keywords: string;

    @Prop({ required: true })
    @ApiProperty({
        type: String,
        description: 'Location of research',
        example: 'Brazil',
    })
    @IsString()
    @IsDefined()
    location: string;

    @Prop({ required: true, type: Array<RobotResponseDTO> })
    @ApiProperty({
        type: RobotResponseDTO,
        description: 'Results of scraping data on Google',
        example: [
            { result: 'News title', timestamp: '2024-02-02T22:00:00Z' },
        ] as RobotResponseDTO[],
        isArray: true,
    })
    @IsArray()
    results: RobotResponseDTO[];
}

export const GoogleSearchSchema = SchemaFactory.createForClass(GoogleSearch);
export type GoogleSearchDocument = HydratedDocument<GoogleSearch>;
