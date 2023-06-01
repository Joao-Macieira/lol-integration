import { RANK_RANKING, REGIONS, TIER_RANKING } from 'src/utils/types';
import { SummonerChampionsOutputDTO } from './summoner-champions.dto';

export class SummonerInputDTO {
  name: string;
  region: REGIONS;
  filters: {
    queueId: number;
  };
}

export class SummonerOutput {
  profileData: ProfileDataDTO[];
  region: REGIONS;
  masteryChampions: SummonerChampionsOutputDTO[];
}

export class GetSummonerAcocuntInputDTO {
  name: string;
  region: REGIONS;
}

export class ProfileDataDTO {
  leagueId: string;
  queueType: number;
  tier: TIER_RANKING;
  rank: RANK_RANKING;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}
