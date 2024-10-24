import { PaginationProps } from '../../composables/Pagination';
import { useControlsContext } from '../context';

export type UsePagination = () => {
  props?: PaginationProps;
};

export const usePagination: UsePagination = () => {
  const { data } = useControlsContext();
  if (!data?.pagination) {
    return {};
  }

  const {
    currentPage,
    disableNext,
    disablePrevious,
    handlePaginateNext,
    handlePaginatePrevious,
  } = data.pagination;

  return {
    props: {
      currentPage: currentPage,
      disableNext: disableNext,
      disablePrevious: disablePrevious,
      handlePaginateNext: handlePaginateNext,
      handlePaginatePrevious: handlePaginatePrevious,
    },
  };
};
