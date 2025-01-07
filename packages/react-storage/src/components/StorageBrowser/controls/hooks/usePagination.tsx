import { PaginationProps } from '../../composables/Pagination';
import { useControlsContext } from '../../controls/context';

export const usePagination = (): PaginationProps => {
  const { data, onPaginate } = useControlsContext();
  const { paginationData } = data;

  return { ...paginationData, onPaginate };
};
