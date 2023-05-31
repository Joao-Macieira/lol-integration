import { HttpException, Inject, Injectable } from '@nestjs/common';
import { FindMatchByPUUIDInputDTO } from './dto/find-match-by-puuid.dto';
import { REGION_MAPPING } from 'src/utils/types';
import { SummonersService } from 'src/summoners/summoners.service';
import { HttpService } from '@nestjs/axios';
import { getLolBaseUrl } from 'src/utils/get-lol-url';

@Injectable()
export class MatchesService {
  private apiKey: string;

  constructor(
    @Inject(SummonersService)
    private summonerService: SummonersService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = process.env.RIOT_API_KEY;
  }

  async findMatchBySummonerPuuid(input: FindMatchByPUUIDInputDTO) {
    const { name, region, startTime, endTime, queue, type, start, count } =
      input;
    const regionCluster = REGION_MAPPING[region];

    const summoner = await this.summonerService.getSummonerAccount({
      name,
      region,
    });

    const { puuid } = summoner;

    let queryParams = '';
    if (startTime) queryParams += `&startTime=${startTime}`;
    if (endTime) queryParams += `&endTime=${endTime}`;
    if (queue) queryParams += `&queue=${queue}`;
    if (type) queryParams += `&type=${type}`;
    if (start) queryParams += `&start=${start}`;
    if (count) queryParams += `&count=${count}`;

    try {
      const url = `${getLolBaseUrl(
        regionCluster,
      )}/match/v5/matches/by-puuid/${puuid}/ids?${queryParams}`;

      const response = await this.httpService.axiosRef.get(url, {
        headers: { 'X-Riot-Token': this.apiKey },
      });
      const matchList = response?.data;

      const output = {
        summonerName: summoner.name,
        matchList,
      };

      return output;
    } catch {
      throw new HttpException('Invalid request', 400);
    }
  }
}