import { Injectable } from '@nestjs/common';
import { Model, Query } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QueryOptions } from '../config/query-options.config';
import { exec } from 'child_process';

@Injectable()
export class SnippetsService {

  constructor(@InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>) {
  }

  //get all snippets from database
  async getAll(options: QueryOptions): Promise<Snippet[]> {
    return await this.snippetModel
      .find()
      .skip(Number(options.offset))
      .limit(Number(options.limit))
      .exec();
  }

  //get all snippets by tag name
  async getAllByTagName(name: string): Promise<Snippet[]> {
    return this.snippetModel.find({tags: name}).exec()
  }

  //get all snippets by title
  async getAllSnippetsByTitle(title: string): Promise<Snippet[]> {
    return this.snippetModel.find({title: new RegExp(title, 'i')}).exec()
  }

  //get a snippet by id from database
  async getById(id: string): Promise<Snippet> {
    return this.snippetModel.findById(id);
  }

  //create a snippet in database
  async create(snippetDto: CreateSnippetDto): Promise<Snippet> {
    const newSnippet = new this.snippetModel(snippetDto)
    return await newSnippet.save()

  }

  //update a snippet in database
  async update(id: string, snippetDto: CreateSnippetDto): Promise<Snippet> {
    return this.snippetModel.findByIdAndUpdate(id, snippetDto, {new: true})
  }

  //delete a snippet in database
  async remove(id: string): Promise<Snippet> {
    const deletedSnippet = await this.snippetModel.findByIdAndRemove(id);
    return deletedSnippet;
  }


}
