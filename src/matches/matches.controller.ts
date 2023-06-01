import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { FindMatchByPUUIDFiltersInputDTO } from './dto/find-match-by-puuid.dto';
import { REGIONS } from 'src/utils/types';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('match-list/:name/:region')
  findOne(
    @Query() query: FindMatchByPUUIDFiltersInputDTO,
    @Param('name') name: string,
    @Param('region') region: string,
  ) {
    return this.matchesService.getSummonerMatches({
      name,
      region: REGIONS[region],
      ...query,
    });
  }
}
