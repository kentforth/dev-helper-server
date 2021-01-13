import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnippetDocument = Snippet & Document

@Schema()
export class Snippet {

  @Prop()
  title: string

  @Prop()
  steps: Array<Object>

  @Prop()
  tags: Array<String>

  @Prop()
  hasImages: boolean
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet)
