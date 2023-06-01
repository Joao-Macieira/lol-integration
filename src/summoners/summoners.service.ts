import { Repository } from 'typeorm';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { getLolBaseUrl } from 'src/utils/get-lol-url';
import {
  GetSummonerAcocuntInputDTO,
  ProfileDataDTO,
  SummonerInputDTO,
  SummonerOutput,
} from './dto/summoner.dto';
import { Summoner } from './entities/summoner.entity';
import {
  SummonerChampionsInputDTO,
  SummonerChampionsOutputDTO,
} from './dto/summoner-champions.dto';
import { QUEUE_TYPE } from 'src/utils/types';
import { SummonerMapper } from './mapper/summoner.mapper';

@Injectable()
export class SummonersService {
  private apiKey: string;

  constructor(
    @InjectRepository(Summoner)
    private readonly summonerRepository: Repository<Summoner>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = process.env.RIOT_API_KEY;
  }

  async getSummonerAccount(input: GetSummonerAcocuntInputDTO) {
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
    const summonerAccount = await this.getSummonerAccount({
      name: summonerDto.name,
      region: summonerDto.region,
    });
    const { id } = summonerAccount;

    const cachedData: SummonerOutput = await this.cacheManager.get(id);

    if (cachedData) {
      const filteredProfileData = cachedData.profileData.filter((profile) =>
        summonerDto.filters.queueId
          ? profile.queueType === QUEUE_TYPE[summonerDto.filters.queueId]
          : true,
      );

      return SummonerMapper.toOutput({
        profileData: filteredProfileData,
        region: summonerDto.region,
        masteryChampions: cachedData.masteryChampions,
      });
    }

    const summoner = await this.summonerRepository.findOne({ where: { id } });

    const url = `${getLolBaseUrl(
      summonerDto.region,
    )}/league/v4/entries/by-summoner/${id}`;

    const response = await this.httpService.axiosRef.get(url, {
      headers: { 'X-Riot-Token': this.apiKey },
    });

    if (!response.data) {
      throw new HttpException('Summoner not found', 404);
    }

    const profileData = response.data as ProfileDataDTO[];

    const championsMasteries = await this.getSummonerChampions({
      id,
      region: summonerDto.region,
    });

    if (!summoner) {
      const dbSummonerCreated = this.summonerRepository.create({
        id: summonerAccount.id,
        accountId: summonerAccount.accountId,
        puuid: summonerAccount.puuid,
        revisionDate: summonerAccount.revisionDate,
        profileIconId: summonerAccount.profileIconId,
        summonerLevel: summonerAccount.summonerLevel,
        name: summonerAccount.name,
        region: summonerDto.region,
        profile: profileData,
      });
      await this.summonerRepository.save(dbSummonerCreated);
    } else {
      await this.summonerRepository
        .createQueryBuilder()
        .update()
        .set({
          profile: profileData,
        })
        .where('id = :id')
        .setParameters({ id: summoner.id })
        .execute();
    }

    const filteredProfileData = profileData.filter((profile) =>
      summonerDto.filters.queueId && String(summonerDto.filters.queueId) !== '0'
        ? profile.queueType === QUEUE_TYPE[summonerDto.filters.queueId]
        : true,
    );

    const output = SummonerMapper.toOutput({
      profileData: filteredProfileData,
      region: summonerDto.region,
      masteryChampions: championsMasteries,
    });

    await this.cacheManager.set(output.profileData[0].summonerId, {
      profileData,
      region: summonerDto.region,
      masteryChampions: championsMasteries,
    });

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
