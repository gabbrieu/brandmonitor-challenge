import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RobotResponse } from './dto/response/robot-response.dto';

@Schema()
export class GoogleSearch {
    @Prop({ required: true })
    frequency: number;

    @Prop({ required: true })
    keywords: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true, type: Array<RobotResponse> })
    results: RobotResponse[];
}

export const GoogleSearchSchema = SchemaFactory.createForClass(GoogleSearch);
export type GoogleSearchDocument = HydratedDocument<GoogleSearch>;
