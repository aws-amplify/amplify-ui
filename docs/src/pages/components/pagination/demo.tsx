import * as React from 'react';
import { Pagination } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { PaginationPropControls } from './PaginationPropControls';
import { usePaginationProps } from './usePaginationProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (paginationProps) => {
  return (
    `<Pagination
  currentPage={${paginationProps.currentPage}}
  totalPages={${paginationProps.totalPages}}
  siblingCount={${paginationProps.siblingCount}}` +
    (paginationProps.hasMorePages ? `\n  hasMorePages` : '') +
    `\n/>`
  );
};

const defaultPaginationProps = {
  currentPage: 1,
  totalPages: 10,
  siblingCount: 1,
  hasMorePages: false,
};

export const PaginationDemo = () => {
  const paginationProps = usePaginationProps(
    demoState.get(Pagination.displayName) || defaultPaginationProps
  );

  React.useEffect(() => {
    demoState.set(Pagination.displayName, paginationProps);
  }, [paginationProps]);

  return (
    <Demo
      code={propsToCode(paginationProps)}
      propControls={<PaginationPropControls {...paginationProps} />}
    >
      <Pagination
        currentPage={paginationProps.currentPage}
        totalPages={paginationProps.totalPages}
        siblingCount={paginationProps.siblingCount}
        hasMorePages={paginationProps.hasMorePages}
        onNext={paginationProps.onNext}
        onPrevious={paginationProps.onPrevious}
        onChange={paginationProps.onChange}
      />
    </Demo>
  );
};
