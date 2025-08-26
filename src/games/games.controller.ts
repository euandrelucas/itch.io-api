import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  private validateType(type: string) {
    if (!this.gamesService.isValidType(type)) {
      throw new BadRequestException('Invalid type');
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'API Info' })
  getInfo() {
    return {
      status: 200,
      message: 'Welcome to a itch.io alternative API',
      routes: [
        { path: '/search?q=something', description: 'Search for games' },
        { path: '/newest/:type', description: 'Newest games by type' },
        {
          path: '/new-and-popular/:type',
          description: 'New & popular games by type',
        },
        { path: '/top-sellers/:type', description: 'Top sellers by type' },
        { path: '/top-rated/:type', description: 'Top rated by type' },
      ],
    };
  }

  @Get('/newest/:type')
  @ApiOperation({ summary: 'Get newest games by type' })
  @ApiParam({ name: 'type', example: 'horror' })
  @ApiResponse({
    status: 200,
    description: 'List of newest games',
    schema: {
      example: {
        type: 'newest',
        genre: 'horror',
        games: [
          {
            title: 'Scary Game 1',
            url: 'https://example.com/game1',
            author: 'Game Studio 1',
            authorUrl: 'https://example.com/gamestudio1',
            coverUrl: 'https://example.com/game1-cover.jpg',
            description: 'A scary game set in a haunted house.',
            price: '$5',
            genre: 'Horror',
          },
          {
            title: 'Scary Game 2',
            url: 'https://example.com/game2',
            author: 'Game Studio 2',
            authorUrl: 'https://example.com/gamestudio2',
            coverUrl: 'https://example.com/game2-cover.jpg',
            description: 'A scary game set in a haunted forest.',
            price: '$10',
            genre: 'Horror',
          },
        ],
      },
    },
  })
  async getNewest(@Param('type') type: string) {
    this.validateType(type);
    return {
      type: 'newest',
      genre: type,
      games: await this.gamesService.fetchGamesByTag(type, 'newest'),
    };
  }

  @Get('/new-and-popular/:type')
  @ApiOperation({ summary: 'Get new and popular games by type' })
  @ApiParam({ name: 'type', example: '3d' })
  @ApiResponse({
    status: 200,
    description: 'List of new and popular games',
    schema: {
      example: {
        type: 'new-and-popular',
        genre: '3d',
        games: [
          {
            title: '3D Game 1',
            url: 'https://example.com/game1',
            author: 'Game Studio 1',
            authorUrl: 'https://example.com/gamestudio1',
            coverUrl: 'https://example.com/game1-cover.jpg',
            description: 'A thrilling 3D adventure game.',
            price: '$15',
            genre: '3D',
          },
          {
            title: '3D Game 2',
            url: 'https://example.com/game2',
            author: 'Game Studio 2',
            authorUrl: 'https://example.com/gamestudio2',
            coverUrl: 'https://example.com/game2-cover.jpg',
            description: 'An immersive 3D puzzle game.',
            price: '$20',
            genre: '3D',
          },
        ],
      },
    },
  })
  async getNewAndPopular(@Param('type') type: string) {
    this.validateType(type);
    return {
      type: 'new-and-popular',
      genre: type,
      games: await this.gamesService.fetchGamesByTag(type, 'new-and-popular'),
    };
  }

  @Get('/top-sellers/:type')
  @ApiOperation({ summary: 'Get top sellers games by type' })
  @ApiParam({ name: 'type', example: 'retro' })
  @ApiResponse({
    status: 200,
    description: 'List of top sellers games',
    schema: {
      example: {
        type: 'top-sellers',
        genre: 'retro',
        games: [
          {
            title: 'Retro Game 1',
            url: 'https://example.com/game1',
            author: 'Game Studio 1',
            authorUrl: 'https://example.com/gamestudio1',
            coverUrl: 'https://example.com/game1-cover.jpg',
            description: 'A classic retro platformer.',
            price: '$5',
            genre: 'Retro',
          },
          {
            title: 'Retro Game 2',
            url: 'https://example.com/game2',
            author: 'Game Studio 2',
            authorUrl: 'https://example.com/gamestudio2',
            coverUrl: 'https://example.com/game2-cover.jpg',
            description: 'An exciting retro adventure game.',
            price: '$10',
            genre: 'Retro',
          },
        ],
      },
    },
  })
  async getTopSellers(@Param('type') type: string) {
    this.validateType(type);
    return {
      type: 'top-sellers',
      genre: type,
      games: await this.gamesService.fetchGamesByTag(type, 'top-sellers'),
    };
  }

  @Get('/top-rated/:type')
  @ApiOperation({ summary: 'Get top rated games by type' })
  @ApiParam({ name: 'type', example: 'psx' })
  @ApiResponse({
    status: 200,
    description: 'List of top rated games',
    schema: {
      example: {
        type: 'top-rated',
        genre: 'psx',
        games: [
          {
            title: 'PSX Game 1',
            url: 'https://example.com/game1',
            author: 'Game Studio 1',
            authorUrl: 'https://example.com/gamestudio1',
            coverUrl: 'https://example.com/game1-cover.jpg',
            description: 'A classic PSX adventure game.',
            price: '$15',
            genre: 'PSX',
          },
          {
            title: 'PSX Game 2',
            url: 'https://example.com/game2',
            author: 'Game Studio 2',
            authorUrl: 'https://example.com/gamestudio2',
            coverUrl: 'https://example.com/game2-cover.jpg',
            description: 'An immersive PSX puzzle game.',
            price: '$20',
            genre: 'PSX',
          },
        ],
      },
    },
  })
  async getTopRated(@Param('type') type: string) {
    this.validateType(type);
    return {
      type: 'top-rated',
      genre: type,
      games: await this.gamesService.fetchGamesByTag(type, 'top-rated'),
    };
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search games by query' })
  @ApiQuery({ name: 'q', example: 'horror' })
  @ApiResponse({
    status: 200,
    description: 'List of search results',
    schema: {
      example: {
        type: 'search',
        query: 'horror',
        games: [
          {
            title: 'Horror Game 1',
            url: 'https://example.com/game1',
            author: 'Game Studio 1',
            authorUrl: 'https://example.com/gamestudio1',
            coverUrl: 'https://example.com/game1-cover.jpg',
            description: 'A terrifying horror experience.',
            price: '$10',
            genre: 'Horror',
          },
          {
            title: 'Horror Game 2',
            url: 'https://example.com/game2',
            author: 'Game Studio 2',
            authorUrl: 'https://example.com/gamestudio2',
            coverUrl: 'https://example.com/game2-cover.jpg',
            description: 'An immersive horror adventure.',
            price: '$15',
            genre: 'Horror',
          },
        ],
      },
    },
  })
  async search(@Query() query: SearchDto) {
    return {
      type: 'search',
      query: query.q,
      games: await this.gamesService.search(query.q),
    };
  }
}
