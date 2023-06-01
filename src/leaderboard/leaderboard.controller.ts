import { Controller, Get, Param, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { REGIONS } from 'src/utils/types';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get(':name/:region')
  findOne(
    @Param('name') name: string,
    @Param('region') region: string,
    @Query() query: any,
  ) {
    return this.leaderboardService.getLeaderboard({
      name,
      filters: query,
      region: REGIONS[region],
    });
  }
}
