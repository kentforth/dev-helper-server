import { Controller, Get } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Snippet } from './schemas/snippet.schema';

@Controller('snippets')
export class SnippetsController {

  constructor(private readonly snippetsService: SnippetsService) {
  }

  @Get()
  getAll(): Promise<Snippet[]> {
    return this.snippetsService.getAll();
  }
}
