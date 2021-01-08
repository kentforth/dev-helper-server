import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Req, Res } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Snippet } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { Query } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@Controller('snippets')
@ApiTags('snippets')
export class SnippetsController {

  constructor(private readonly snippetsService: SnippetsService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Req() req): Promise<Snippet[]> {
    const snippets = await this.snippetsService.getAll(req.query);
    return snippets;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Snippet> {
    const snippet = await this.snippetsService.getById(id);
    if (!snippet) throw new NotFoundException('Snippet Not found')
    return snippet;
  }

  @Get('/tag/:name')
  @HttpCode(HttpStatus.OK)
  async getAllByTagName(@Param('name') name: string): Promise<Snippet[]> {
    const snippets = await this.snippetsService.getAllByTagName(name)
    return snippets;
  }

  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  async getAllSnippetsByTitle(@Param('title') title: string): Promise<Snippet[]> {
    const snippets = await this.snippetsService.getAllSnippetsByTitle(title)
    return snippets;
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
