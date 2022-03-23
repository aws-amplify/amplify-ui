import * as React from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const PaginationHasMorePagesExample = () => {
  const [pageTokens, setPageTokens] = React.useState([
    {
      res: 'dog',
      nextToken: 'page2',
    },
  ]);
  const [currPageIndex, setCurrPageIndex] = React.useState(1);
  const [hasMorePages, setHasMorePages] = React.useState(true);

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

  const handleOnChange = (e) => {
    setCurrPageIndex(e);
  };

  return (
    <Pagination
      currentPage={currPageIndex}
      totalPages={pageTokens.length}
      hasMorePages={hasMorePages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={(e) => handleOnChange(e)}
    />
  );
};

const mockedAPI = (function () {
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

  return function () {
    if (timesCalled < 2) {
      return response[timesCalled++];
    }
  };
})();
