import * as React from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const ControlledPaginationExample = () => {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);
  const totalPages = 5;

  const handleNextPage = () => {
    console.log('handleNextPage');
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    console.log('handlePreviousPage');
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleOnChange = (newPageIndex, prevPageIndex) => {
    console.log(
      `handleOnChange \n - newPageIndex: ${newPageIndex} \n - prevPageIndex: ${prevPageIndex}`
    );
    setCurrentPageIndex(newPageIndex);
  };

  return (
    <Pagination
      currentPage={currentPageIndex}
      totalPages={totalPages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={handleOnChange}
    />
  );
};
