import * as React from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const PaginationStylingExample = ({
  className,
  totalPages,
  ...rest
}) => {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);

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
      className={className}
      currentPage={currentPageIndex}
      totalPages={totalPages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={handleOnChange}
      {...rest}
    />
  );
};
