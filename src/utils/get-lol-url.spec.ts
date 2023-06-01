import { getLolBaseUrl } from './get-lol-url';
import { REGIONS, REGION_MAPPING } from './types';

describe('getLolUrl unit tests', () => {
  it('should return lol url wiht corrrect subpath', () => {
    let url = getLolBaseUrl(REGIONS['euw1']);
    expect(url).toEqual(`https://euw1.${process.env.RIOT_BASE_URL_LOL}`);

    url = getLolBaseUrl(REGIONS['br1']);
    expect(url).toEqual(`https://br1.${process.env.RIOT_BASE_URL_LOL}`);

    url = getLolBaseUrl(REGION_MAPPING['br1']);
    expect(url).toEqual(`https://americas.${process.env.RIOT_BASE_URL_LOL}`);

    url = getLolBaseUrl(REGION_MAPPING['kr']);
    expect(url).toEqual(`https://asia.${process.env.RIOT_BASE_URL_LOL}`);
  });
});
