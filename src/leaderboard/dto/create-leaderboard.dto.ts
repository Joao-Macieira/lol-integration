import { REGIONS } from 'src/utils/types';

export class GetLeaderboardInputDTO {
  name: string;
  region: REGIONS;
  filters: {
    queueId: number;
  };
}
