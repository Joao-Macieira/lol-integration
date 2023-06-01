import { REGIONS, REGION_MAPPING } from './types';

export function getLolBaseUrl(region: REGIONS | REGION_MAPPING) {
  const url = `https://${region.toLowerCase()}.${
    process.env.RIOT_BASE_URL_LOL
  }`;

  return url;
}
