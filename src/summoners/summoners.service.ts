import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

import { getLolBaseUrl } from 'src/utils/get-lol-url';
import { SummonerInputDTO } from './dto/summoner.dto';
import { Summoner } from './entities/summoner.entity';
import {
  SummonerChampionsInputDTO,
  SummonerChampionsOutputDTO,
} from './dto/summoner-champions.dto';

@Injectable()
export class SummonersService {
  private apiKey: string;

  constructor(
    @InjectRepository(Summoner)
    private readonly summonerRepository: Repository<Summoner>,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = process.env.RIOT_API_KEY;
  }

  async getSummonerAccount(input: SummonerInputDTO) {
    const { name, region } = input;

    const url = `${getLolBaseUrl(
      region,
    )}/summoner/v4/summoners/by-name/${name}`;

    try {
      const response = await this.httpService.axiosRef.get(url, {
        headers: { 'X-Riot-Token': this.apiKey },
      });

      const summoner: Summoner = response?.data;

      if (!summoner) {
        throw new HttpException('Summoner not found', 404);
      }

      return summoner;
    } catch (error) {
      throw new HttpException('Invalid request', 400);
    }
  }

  async getSummonerProfile(summonerDto: SummonerInputDTO): Promise<any> {
    const summonerAccount = await this.getSummonerAccount(summonerDto);
    const { id } = summonerAccount;

    const summoner = await this.summonerRepository.findOne({ where: { id } });

    if (!summoner) {
      const dbSummonerCreated = this.summonerRepository.create(summonerAccount);
      await this.summonerRepository.save(dbSummonerCreated);
    }

    const url = `${getLolBaseUrl(
      summonerDto.region,
    )}/league/v4/entries/by-summoner/${id}`;

    const response = await this.httpService.axiosRef.get(url, {
      headers: { 'X-Riot-Token': this.apiKey },
    });

    if (!response.data) {
      throw new HttpException('Summoner not found', 404);
    }

    const profileData = response.data[0];

    const championsMasteries = await this.getSummonerChampions({
      id,
      region: summonerDto.region,
    });

    const output = {
      leagueId: profileData.leagueId,
      queueType: profileData.queueType,
      tier: profileData.tier,
      rank: profileData.rank,
      summonerId: profileData.summonerId,
      summonerName: profileData.summonerName,
      leaguePoints: profileData.leaguePoints,
      wins: profileData.wins,
      losses: profileData.losses,
      masteryChampions: championsMasteries,
    };

    return output;
  }

  async getSummonerChampions({
    id,
    region,
  }: SummonerChampionsInputDTO): Promise<SummonerChampionsOutputDTO[]> {
    const url = `${getLolBaseUrl(
      region,
    )}/champion-mastery/v4/champion-masteries/by-summoner/${id}/top?count=20`;

    const response = await this.httpService.axiosRef.get(url, {
      headers: { 'X-Riot-Token': this.apiKey },
    });

    return response?.data;
  }
}
