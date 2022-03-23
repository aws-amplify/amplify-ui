import * as React from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const PaginationHasMorePagesExample = () => {
  const [pageTokens, setPageTokens] = React.useState(['page2']);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);
  const [hasMorePages, setHasMorePages] = React.useState(true);

  const handleNextPage = async () => {
    if (hasMorePages && currentPageIndex === pageTokens.length) {
      const { nextToken } = await mockedAPI();

      if (!nextToken) {
        setHasMorePages(false);
      }

      setPageTokens([...pageTokens, nextToken]);
    }

    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 1) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleOnChange = (e) => {
    setCurrentPageIndex(e);
  };

  return (
    <Pagination
      currentPage={currentPageIndex}
      totalPages={pageTokens.length}
      hasMorePages={hasMorePages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={(e) => handleOnChange(e)}
    />
  );
};

const mockedAPI = (() => {
  const response = [
    {
      res: 'cat',
      nextToken: 'page3',
    },
    {
      res: 'parrot',
      nextToken: null,
    },
  ];

  let timesCalled = 0;

  return () => {
    if (timesCalled < 2) {
      return response[timesCalled++];
    }
  };
})();
