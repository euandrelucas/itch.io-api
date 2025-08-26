import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    example: 'horror',
    description: 'Search query for itch.io games',
  })
  @IsString()
  @IsNotEmpty()
  q: string;
}
