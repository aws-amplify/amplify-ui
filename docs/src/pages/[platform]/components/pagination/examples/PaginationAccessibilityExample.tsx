import { usePagination, Pagination } from '@aws-amplify/ui-react';

export const PaginationAccessibilityExample = () => {
  const paginationProps = usePagination({ totalPages: 5 });
  return (
    <Pagination
      pageLabel="Jump to page"
      currentPageLabel="You are on page"
      previousLabel="Back to previous page"
      nextLabel="Forward to next page"
      {...paginationProps}
    />
  );
};
