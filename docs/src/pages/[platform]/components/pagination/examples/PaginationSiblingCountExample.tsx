import { Pagination, usePagination } from '@aws-amplify/ui-react';

export const PaginationSiblingCountExample = () => {
  const paginationProps = usePagination({
    totalPages: 11,
    currentPage: 5,
    siblingCount: 2,
  });

  return <Pagination {...paginationProps} />;
};
