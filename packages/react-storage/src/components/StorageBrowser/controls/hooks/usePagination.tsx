import type { PaginationProps } from '../../components/composables/Pagination';
import { useControlsContext } from '../context';

export const usePagination = (): PaginationProps => {
  const { data, onPaginate } = useControlsContext();
  const { paginationData } = data;

  return { ...paginationData, onPaginate };
};
