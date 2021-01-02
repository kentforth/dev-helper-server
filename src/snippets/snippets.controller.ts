import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Snippet } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';

@Controller('snippets')
export class SnippetsController {

  constructor(private readonly snippetsService: SnippetsService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Snippet[]> {
    const snippets = await this.snippetsService.getAll();
    return snippets;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Snippet> {
    const snippet = await this.snippetsService.getById(id);
    if (!snippet) throw new NotFoundException('Snippet Not found')
    return snippet;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSnippetDto: CreateSnippetDto): Promise<Snippet>{
    return await this.snippetsService.create(createSnippetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Snippet> {
    const snippet = await this.snippetsService.getById(id)
    if (!snippet) throw new NotFoundException('Snippet Not found')
    return this.snippetsService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() createSnippetDto: CreateSnippetDto, @Param('id') id: string): Promise<Snippet> {
    const snippet = await this.snippetsService.getById(id)
    if (!snippet) throw new NotFoundException('Snippet Not found')
    return this.snippetsService.update(id, createSnippetDto);
  }
}
