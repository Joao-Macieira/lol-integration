import { REGIONS } from './types';

export function getLolBaseUrl(region: REGIONS) {
  const url = `https://${region.toLocaleLowerCase()}.${
    process.env.RIOT_BASE_URL_LOL
  }`;

  return url;
}
