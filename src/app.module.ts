import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsModule } from './snippets/snippets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SnippetsModule,
    MongooseModule.forRoot(`${process.env.MONGO_URL}`, { useFindAndModify: false, useNewUrlParser: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
