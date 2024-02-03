import { ApiProperty } from '@nestjs/swagger';

export class RobotResponseDTO {
    @ApiProperty({
        type: String,
        description: `Google's news titles`,
        example: 'World cup - a brief story',
    })
    result: string;

    @ApiProperty({
        type: String,
        description: 'Timestamp of scraped news',
        example: '2024-02-02T22:00:00Z',
    })
    timestamp: string;
}
