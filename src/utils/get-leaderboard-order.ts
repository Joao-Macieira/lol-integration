import { RANK_RANKING, TIER_RANKING } from './types';
import { ProfileDataDTO } from 'src/summoners/dto/summoner.dto';

export function getLeaderboardOrder(profiles: ProfileDataDTO[], name: string) {
  const sortedProfilesByRank = profiles
    .sort((a, b) => {
      if (TIER_RANKING[a.tier] > TIER_RANKING[b.tier]) return 1;
      if (TIER_RANKING[a.tier] < TIER_RANKING[b.tier]) return -1;
      if (TIER_RANKING[a.tier] === TIER_RANKING[b.tier]) {
        if (RANK_RANKING[a.rank] > RANK_RANKING[b.rank]) return 1;
        if (RANK_RANKING[a.rank] < RANK_RANKING[b.rank]) return -1;
        return a.leaguePoints - b.leaguePoints;
      }
      return 0;
    })
    .reverse();

  const myPositionByRank = sortedProfilesByRank.findIndex(
    (item) => item.summonerName === name,
  );

  const sortedProfilesByWinRate = profiles
    .sort((a, b) => {
      if (caculateWinRate(a.wins, a.losses) > caculateWinRate(b.wins, b.losses))
        return 1;
      if (caculateWinRate(a.wins, a.losses) < caculateWinRate(b.wins, b.losses))
        return -1;

      return 0;
    })
    .reverse();

  const myPositionByWinRate = sortedProfilesByWinRate.findIndex(
    (item) => item.summonerName === name,
  );

  return {
    leaguePoints: {
      top: myPositionByRank + 1,
    },
    winRate: {
      top: myPositionByWinRate + 1,
    },
  };
}

function caculateWinRate(wins: number, losses: number): number {
  return wins / (wins + losses);
}
