import { Controller, Get, Query } from '@nestjs/common';
import { SummonersService } from './summoners.service';
import { SummonerInputDTO } from './dto/summoner.dto';

@Controller('summoner')
export class SummonersController {
  constructor(private readonly summonersService: SummonersService) {}

  @Get('infos')
  async getSummonerInfo(@Query() query: SummonerInputDTO) {
    return this.summonersService.getSummonerProfile(query);
  }
}
