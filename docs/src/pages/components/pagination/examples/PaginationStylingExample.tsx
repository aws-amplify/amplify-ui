import { Pagination, usePagination } from '@aws-amplify/ui-react';

export const PaginationStylingExample = ({
  className,
  totalPages,
  ...rest
}) => {
  const paginationProps = usePagination({ totalPages });

  return <Pagination className={className} {...paginationProps} {...rest} />;
};
