import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SnippetsService {

  constructor(@InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>) {
  }

  async getAll(): Promise<Snippet[]> {
    return this.snippetModel.find().exec()
  }
}
