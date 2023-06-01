import { Controller, Get, Param, Query } from '@nestjs/common';
import { SummonersService } from './summoners.service';
import { REGIONS } from 'src/utils/types';

@Controller('summoner')
export class SummonersController {
  constructor(private readonly summonersService: SummonersService) {}

  @Get('infos/:name/:region')
  async getSummonerInfo(
    @Query() query: any,
    @Param('name') name: string,
    @Param('region') region: string,
  ) {
    return this.summonersService.getSummonerProfile({
      name,
      filters: query,
      region: REGIONS[region],
    });
  }
}
