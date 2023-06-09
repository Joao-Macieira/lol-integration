import { REGIONS } from 'src/utils/types';

export class FindMatchByPUUIDInputDTO {
  name: string;
  region: REGIONS;
  startTime: number;
  endTime: number;
  queue: number;
  type: string;
  start: number;
  size: number;
  queueType?: string;
  page: number;
  limit: number;
}

export class FindMatchByPUUIDFiltersInputDTO {
  startTime: number;
  endTime: number;
  queue: number;
  type: string;
  start: number;
  size: number;
  queueType?: string;
  page: number;
  limit: number;
}
