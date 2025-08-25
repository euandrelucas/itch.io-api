import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({ example: 'horror', description: 'Query de busca no itch.io' })
  @IsString()
  @IsNotEmpty()
  q: string;
}
