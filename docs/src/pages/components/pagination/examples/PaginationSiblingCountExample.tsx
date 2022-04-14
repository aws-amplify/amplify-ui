import * as React from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const PaginationSiblingCountExample = () => {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(5);
  const totalPages = 10;
  const numberOfSiblingsOnEachSideOfCurrentPage = 2;

  const handleNextPage = () => {
    if (currentPageIndex < totalPages) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 1) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleOnChange = (pageIndex) => setCurrentPageIndex(pageIndex);

  return (
    <Pagination
      currentPage={currentPageIndex}
      totalPages={totalPages}
      siblingCount={numberOfSiblingsOnEachSideOfCurrentPage}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={handleOnChange}
    />
  );
};
