import { PaginationProps } from '../../composables/Pagination';
import { useControlsContext } from '../context';

export const usePagination = (): PaginationProps | null => {
  const { data } = useControlsContext();
  if (!data?.pagination) {
    return null;
  }

  return data.pagination;
};
