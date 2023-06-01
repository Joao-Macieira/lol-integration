import { paginate } from './paginate';

describe('paginate unit tests', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  it('should paginate the array correctly', () => {
    let paginatedArray = paginate(array, 1, 5);
    expect(paginatedArray).toHaveLength(5);
    expect(paginatedArray).toEqual([1, 2, 3, 4, 5]);

    paginatedArray = paginate(array, 2, 5);
    expect(paginatedArray).toHaveLength(5);
    expect(paginatedArray).toEqual([6, 7, 8, 9, 10]);
  });
});
