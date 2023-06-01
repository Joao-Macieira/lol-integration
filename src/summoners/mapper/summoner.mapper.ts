import { SummonerOutput } from '../dto/summoner.dto';

export class SummonerMapper {
  static toOutput(input: SummonerOutput) {
    return {
      profileData: input.profileData,
      region: input.region,
      masteryChampions: input.masteryChampions,
    };
  }
}
