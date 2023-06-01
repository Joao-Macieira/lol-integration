import { SummonerOutput } from '../dto/summoner.dto';

export class SummonerMapper {
  static toOutput(input: SummonerOutput) {
    return {
      summonerInfo: input.summonerInfo,
      profileData:
        input.profileData.length >= 1
          ? input.profileData
          : "User don't have infos in this queue",
      region: input.region,
      masteryChampions: input.masteryChampions,
    };
  }
}
