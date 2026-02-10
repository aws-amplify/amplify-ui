const DEFAULT_PAGE_SIZE = 100;

export interface ValidatedPageSize {
  pageSize: number;
  isExplicit: boolean;
}

export const validatePageSize = (
  pageSize: number | undefined
): ValidatedPageSize => {
  if (pageSize === undefined || pageSize === null) {
    return { pageSize: DEFAULT_PAGE_SIZE, isExplicit: false };
  }

  if (!Number.isInteger(pageSize) || pageSize < 1) {
    return { pageSize: DEFAULT_PAGE_SIZE, isExplicit: false };
  }

  return { pageSize, isExplicit: true };
};
