const DEFAULT_PAGE_SIZE = 100;

export const validatePageSize = (pageSize: number | undefined): number => {
  if (
    pageSize === undefined ||
    pageSize === null ||
    !Number.isInteger(pageSize) ||
    pageSize < 1
  ) {
    return DEFAULT_PAGE_SIZE;
  }

  return pageSize;
};
