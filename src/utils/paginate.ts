export function paginate(array: any[], pageNumber: number, pageSize: number) {
  if (!pageNumber || !pageSize) {
    return array;
  }

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedArray = array.slice(startIndex, endIndex);

  return paginatedArray;
}
