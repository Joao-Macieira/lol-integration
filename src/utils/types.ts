export enum REGIONS {
  br1 = 'br1',
  eun1 = 'eun1',
  euw1 = 'euw1',
  jp1 = 'jp1',
  kr = 'kr',
  la1 = 'la1',
  la2 = 'la2',
  na1 = 'na1',
  oc1 = 'oc1',
  ph2 = 'ph2',
  ru = 'ru',
  sg2 = 'sg2',
  th2 = 'th2',
  tr1 = 'tr1',
  tw2 = 'tw2',
  vn2 = 'vn2',
}

export enum REGION_MAPPING {
  br1 = 'americas',
  la1 = 'americas',
  la2 = 'americas',
  na1 = 'americas',
  eun1 = 'europe',
  euw1 = 'europe',
  kr = 'asia',
  ru = 'asia',
  tr1 = 'asia',
  jp1 = 'sea',
  oc1 = 'sea',
  ph2 = 'sea',
  sg2 = 'sea',
  th2 = 'sea',
  tw2 = 'sea',
  vn2 = 'sea',
}

export enum TIER_RANKING {
  IRON = 1,
  BRONZE = 2,
  SILVER = 3,
  GOLD = 4,
  PLATINUM = 5,
  DIAMOND = 6,
  MASTER = 7,
  GRANDMASTER = 8,
  CHALLANGER = 9,
}

export enum RANK_RANKING {
  I = 4,
  II = 3,
  III = 2,
  IV = 1,
}

export const QUEUE_TYPE = {
  420: 'RANKED_SOLO_5x5',
  440: 'RANKED_FLEX_SR',
  430: 'NORMAL_BLIND_PICK',
  400: 'NORMAL_DRAFT_PICK',
  450: 'ARAM',
  0: 'ALL',
};
