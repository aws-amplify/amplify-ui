import { useState } from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const PaginationHasMorePagesExample = () => {
  const [pageTokens, setPageTokens] = useState([
    {
      res: 'dog',
      nextToken: '123',
    },
  ]);
  const [currPageIndex, setCurrPageIndex] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  const handleNextPage = async () => {
    if (hasMorePages && currPageIndex === pageTokens.length) {
      const resultsFromAPI = await mockedAPI();

      if (!resultsFromAPI.nextToken) {
        setHasMorePages(false);
      }

      setPageTokens([...pageTokens, resultsFromAPI]);
    }

    setCurrPageIndex(currPageIndex + 1);
  };

  const handlePreviousPage = () => {
    if (currPageIndex > 1) {
      setCurrPageIndex(currPageIndex - 1);
    }
  };

  return (
    <Pagination
      currentPage={currPageIndex}
      totalPages={pageTokens.length}
      hasMorePages={hasMorePages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
    />
  );
};

const mockedAPI = (function () {
  const response = [
    {
      res: 'cat',
      nextToken: '456',
    },
    {
      res: 'parrot',
      nextToken: null,
    },
  ];

  let timesCalled = 0;

  return function () {
    if (timesCalled < 2) {
      return response[timesCalled++];
    }
  };
})();
