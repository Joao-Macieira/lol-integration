import { Injectable } from '@nestjs/common';
import { GetLeaderboardInputDTO } from './dto/create-leaderboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Summoner } from 'src/summoners/entities/summoner.entity';
import { Repository } from 'typeorm';
import { getLeaderboardOrder } from 'src/utils/get-leaderboard-order';
import { QUEUE_TYPE } from 'src/utils/types';
import { ProfileDataDTO } from 'src/summoners/dto/summoner.dto';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Summoner)
    private readonly summonerRepository: Repository<Summoner>,
  ) {}

  async getLeaderboard({
    name,
    region,
    filters: { queueId = 420 },
  }: GetLeaderboardInputDTO) {
    const summoners = await this.summonerRepository.find({
      where: {
        region,
      },
    });

    const profiles: ProfileDataDTO[] = [];

    summoners.forEach((summoner) => {
      const profile = summoner.profile.filter(
        (profile: ProfileDataDTO) => profile.queueType === QUEUE_TYPE[queueId],
      );

      profiles.push(profile[0]);
    });

    const matchLeaderboard = getLeaderboardOrder(profiles, name);

    return matchLeaderboard;
  }
}
