import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';

@Module({
  imports: [GamesModule],
})
export class AppModule {}
