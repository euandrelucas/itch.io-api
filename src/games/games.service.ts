import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Game } from './interfaces/game.interface';

@Injectable()
export class GamesService {
  static readonly WHITESPACE_NORMALIZE_REGEX = /\s\s+/g;

  private readonly validTypes = [
    'horror',
    '3d',
    'short',
    'atmospheric',
    'first-person',
    'singleplayer',
    'creepy',
    'psychological-horror',
    'psx',
    'survival-horror',
    'retro',
  ];

  isValidType(type: string): boolean {
    return this.validTypes.includes(type.toLowerCase());
  }

  async fetchGamesByTag(tag: string, endpoint: string): Promise<Game[]> {
    try {
      const response = await axios.get(
        `https://itch.io/games/${endpoint}/tag-${tag}`,
      );
      const $ = cheerio.load(response.data);

      const games: Game[] = [];
      $('.game_cell').each((_, element) => {
        games.push(this.parseGame($(element)));
      });

      return games;
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException('Error fetching games');
    }
  }

  async search(query: string): Promise<Game[]> {
    try {
      const response = await axios.get(`https://itch.io/search?q=${query}`);
      const $ = cheerio.load(response.data);

      const games: Game[] = [];
      $('.game_cell').each((_, element) => {
        games.push(this.parseGame($(element)));
      });

      return games;
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException('Error fetching games');
    }
  }

  private parseGameTitle($element: cheerio.Cheerio): string {
    const rawTitle = $element.find('.game_title').text();
    const normalizedTitle = rawTitle
      .trim()
      .replace(GamesService.WHITESPACE_NORMALIZE_REGEX, ' ');
    const priceText = $element.find('.price_value').text().trim();
    return normalizedTitle.replace(priceText, '');
  }

  private parseGame($element: cheerio.Cheerio): Game {
    return {
      title: this.parseGameTitle($element),
      url: $element.find('.game_cell .thumb_link.game_link').attr('href') || '',
      author: $element.find('.game_author a').text().trim(),
      authorUrl: $element.find('.game_author a').attr('href') || '',
      coverUrl:
        $element.find('.game_thumb a.thumb_link img').attr('data-lazy_src') ||
        '',
      description: $element.find('.game_text').text().trim(),
      price: $element.find('.price_value').text().trim() || 'Free',
      genre: $element.find('.game_genre').text().trim(),
    };
  }
}
