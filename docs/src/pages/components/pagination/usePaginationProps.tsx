import * as React from 'react';
import { PaginationProps } from '@aws-amplify/ui-react';
import { PaginationPropControlsProps } from './PaginationPropControls';

interface UsePaginationProps {
  (initialValues: PaginationProps): PaginationPropControlsProps;
}

export const usePaginationProps: UsePaginationProps = (initialValues) => {
  const [currentPage, setCurrentPage] = React.useState<
    PaginationProps['currentPage']
  >(initialValues.currentPage);
  const [totalPages, setTotalPages] = React.useState<
    PaginationProps['totalPages']
  >(initialValues.totalPages);
  const [siblingCount, setSiblingCount] = React.useState<
    PaginationProps['siblingCount']
  >(initialValues.siblingCount);
  const [hasMorePages, setHasMorePages] = React.useState<
    PaginationProps['hasMorePages']
  >(initialValues.hasMorePages);

  const onNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onChange = (pageIndex) => setCurrentPage(pageIndex);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    siblingCount,
    setSiblingCount,
    hasMorePages,
    setHasMorePages,
    onNext,
    onPrevious,
    onChange,
  };
};
