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

  const myPositionByRank = getMyPosition(sortedProfilesByRank, name);

  const sortedProfilesByWinRate = profiles
    .sort((a, b) => {
      if (caculateWinRate(a.wins, a.losses) > caculateWinRate(b.wins, b.losses))
        return 1;
      if (caculateWinRate(a.wins, a.losses) < caculateWinRate(b.wins, b.losses))
        return -1;

      return 0;
    })
    .reverse();

  const myPositionByWinRate = getMyPosition(sortedProfilesByWinRate, name);

  return {
    leaguePoints: {
      top:
        myPositionByRank !== -1
          ? myPositionByRank + 1
          : "User don't have infos in this queue",
    },
    winRate: {
      top:
        myPositionByWinRate !== -1
          ? myPositionByWinRate + 1
          : "User don't have infos in this queue",
    },
  };
}

function caculateWinRate(wins: number, losses: number): number {
  return wins / (wins + losses);
}

function getMyPosition(profiles: ProfileDataDTO[], name: string) {
  return profiles.findIndex((item) =>
    item?.summonerName ? item.summonerName === name : false,
  );
}
