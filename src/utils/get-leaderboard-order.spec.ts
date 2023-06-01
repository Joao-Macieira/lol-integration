import { ProfileDataDTO } from 'src/summoners/dto/summoner.dto';
import { getLeaderboardOrder } from './get-leaderboard-order';

describe('GetLeaderBoardOrder unit tests', () => {
  const playersListMock: ProfileDataDTO[] = [
    {
      rank: 'IV',
      tier: 'SILVER',
      wins: 20,
      losses: 0,
      veteran: false,
      inactive: false,
      leagueId: 'test1',
      hotStreak: false,
      queueType: 420,
      freshBlood: false,
      summonerId: 'test1',
      leaguePoints: 50,
      summonerName: 'user1',
    },
    {
      rank: 'I',
      tier: 'GOLD',
      wins: 25,
      losses: 25,
      veteran: false,
      inactive: false,
      leagueId: 'test2',
      hotStreak: false,
      queueType: 420,
      freshBlood: false,
      summonerId: 'test2',
      leaguePoints: 82,
      summonerName: 'user2',
    },
    {
      rank: 'IV',
      tier: 'SILVER',
      wins: 45,
      losses: 55,
      veteran: false,
      inactive: false,
      leagueId: 'test3',
      hotStreak: false,
      queueType: 420,
      freshBlood: false,
      summonerId: 'test3',
      leaguePoints: 33,
      summonerName: 'user3',
    },
  ];

  describe('should be sorted players', () => {
    it('should expected receive right ranking for user 1', () => {
      const user1Leaderboard = getLeaderboardOrder(playersListMock, 'user1');

      const expectedResult = {
        leaguePoints: {
          top: 2,
        },
        winRate: {
          top: 1,
        },
      };

      expect(user1Leaderboard).toStrictEqual(expectedResult);
    });

    it('should expected receive right ranking for user 2', () => {
      const user1Leaderboard = getLeaderboardOrder(playersListMock, 'user2');

      const expectedResult = {
        leaguePoints: {
          top: 1,
        },
        winRate: {
          top: 2,
        },
      };

      expect(user1Leaderboard).toStrictEqual(expectedResult);
    });

    it('should expected receive right ranking for user 3', () => {
      const user1Leaderboard = getLeaderboardOrder(playersListMock, 'user3');

      const expectedResult = {
        leaguePoints: {
          top: 3,
        },
        winRate: {
          top: 3,
        },
      };

      expect(user1Leaderboard).toStrictEqual(expectedResult);
    });
  });
});
