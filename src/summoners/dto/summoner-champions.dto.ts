import { REGIONS } from 'src/utils/types';

export interface SummonerChampionsInputDTO {
  id: string;
  region: REGIONS;
}

export interface SummonerChampionsOutputDTO {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
}
