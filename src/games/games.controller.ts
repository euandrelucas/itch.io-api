import { Controller, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('/')
  @ApiOperation({ summary: 'API Info' })
  getInfo() {
    return {
      status: 200,
      message: 'Welcome to a itch.io alternative API',
      routes: [
        { path: '/search?q=something', description: 'Search for games' },
        { path: '/newest/:type', description: 'Newest games by type' },
        { path: '/new-and-popular/:type', description: 'New & popular games by type' },
        { path: '/top-sellers/:type', description: 'Top sellers by type' },
        { path: '/top-rated/:type', description: 'Top rated by type' },
      ],
    };
  }

  @Get('/newest/:type')
  @ApiOperation({ summary: 'Get newest games by type' })
  @ApiParam({ name: 'type', example: 'horror' })
  async getNewest(@Param('type') type: string) {
    if (!this.gamesService.isValidType(type)) {
      throw new BadRequestException('Invalid type');
    }
    return { type: 'newest', genre: type, games: await this.gamesService.fetchGamesByTag(type, 'newest') };
  }

  @Get('/new-and-popular/:type')
  @ApiOperation({ summary: 'Get new and popular games by type' })
  @ApiParam({ name: 'type', example: '3d' })
  async getNewAndPopular(@Param('type') type: string) {
    if (!this.gamesService.isValidType(type)) {
      throw new BadRequestException('Invalid type');
    }
    return { type: 'new-and-popular', genre: type, games: await this.gamesService.fetchGamesByTag(type, 'new-and-popular') };
  }

  @Get('/top-sellers/:type')
  @ApiOperation({ summary: 'Get top sellers games by type' })
  @ApiParam({ name: 'type', example: 'retro' })
  async getTopSellers(@Param('type') type: string) {
    if (!this.gamesService.isValidType(type)) {
      throw new BadRequestException('Invalid type');
    }
    return { type: 'top-sellers', genre: type, games: await this.gamesService.fetchGamesByTag(type, 'top-sellers') };
  }

  @Get('/top-rated/:type')
  @ApiOperation({ summary: 'Get top rated games by type' })
  @ApiParam({ name: 'type', example: 'psx' })
  async getTopRated(@Param('type') type: string) {
    if (!this.gamesService.isValidType(type)) {
      throw new BadRequestException('Invalid type');
    }
    return { type: 'top-rated', genre: type, games: await this.gamesService.fetchGamesByTag(type, 'top-rated') };
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search games by query' })
  @ApiQuery({ name: 'q', example: 'horror' })
  async search(@Query() query: SearchDto) {
    return { type: 'search', query: query.q, games: await this.gamesService.search(query.q) };
  }
}
