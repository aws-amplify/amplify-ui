import { usePagination, Pagination } from '@aws-amplify/ui-react';

export const PaginationAccessibilityExample = () => {
  const paginationProps = usePagination({ totalPages: 5 });
  return (
    <Pagination
      pageLabel="Jump to page"
      currentPageLabel="You are on page"
      leftArrowLabel="Back to previous page"
      rightArrowLabel="Forward to next page"
      {...paginationProps}
    />
  );
};
