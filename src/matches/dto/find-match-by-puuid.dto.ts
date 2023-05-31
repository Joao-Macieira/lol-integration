import { REGIONS } from 'src/utils/types';

export class FindMatchByPUUIDInputDTO {
  name: string;
  region: REGIONS;
  startTime: number;
  endTime: number;
  queue: number;
  type: string;
  start: number;
  count: number;
  queueType?: string;
  page: number;
  limit: number;
}
