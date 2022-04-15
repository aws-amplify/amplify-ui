import { Pagination, usePagination } from '@aws-amplify/ui-react';

export const DefaultPaginationExample = () => {
  const paginationProps = usePagination({ totalPages: 8 });

  return <Pagination {...paginationProps} />;
};
