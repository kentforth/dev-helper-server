import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {

  @ApiProperty()
  readonly title: string

  @ApiProperty()
  readonly steps: Array<Object>

  @ApiProperty()
  readonly tags: Array<String>

  @ApiProperty()
  readonly hasImages: boolean
}

