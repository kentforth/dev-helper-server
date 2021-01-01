import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './schemas/snippet.schema';

@Module({
  providers: [SnippetsService],
  controllers: [SnippetsController],
  imports: [MongooseModule.forFeature([
    {name: Snippet.name, schema: SnippetSchema}
  ])]
})
export class SnippetsModule {}
