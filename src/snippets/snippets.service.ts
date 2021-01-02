import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';

@Injectable()
export class SnippetsService {

  constructor(@InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>) {
  }

  //get all snippets from database
  async getAll(): Promise<Snippet[]> {
    return await this.snippetModel.find().exec();
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
