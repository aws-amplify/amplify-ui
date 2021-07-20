import React from 'react';
import { Pagination } from '@aws-amplify/ui-react';

export const PaginationDemo = () => {
  return <Pagination currentPage={1} totalPages={10} />;
};
