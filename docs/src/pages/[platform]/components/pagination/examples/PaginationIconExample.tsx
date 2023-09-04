import {
  Pagination,
  usePagination,
  IconsProvider,
} from '@aws-amplify/ui-react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const PaginationIconExample = () => {
  const paginationProps = usePagination({ totalPages: 6 });

  return (
    <IconsProvider
      icons={{
        pagination: {
          next: <FiArrowRight />,
          previous: <FiArrowLeft />,
        },
      }}
    >
      <Pagination {...paginationProps} />
    </IconsProvider>
  );
};
