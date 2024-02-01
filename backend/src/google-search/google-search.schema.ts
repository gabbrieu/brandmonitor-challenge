import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class GoogleSearch {
    @Prop({ required: true })
    frequency: number;

    @Prop({ required: true })
    keywords: string;

    @Prop({ required: true })
    location: string;
}

export const GoogleSearchSchema = SchemaFactory.createForClass(GoogleSearch);
export type GoogleSearchDocument = HydratedDocument<GoogleSearch>;
