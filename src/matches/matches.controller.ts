import { Controller, Get, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { FindMatchByPUUIDInputDTO } from './dto/find-match-by-puuid.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('match-list')
  findOne(@Query() query: FindMatchByPUUIDInputDTO) {
    return this.matchesService.findMatchBySummonerPuuid(query);
  }
}
