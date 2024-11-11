import React from 'react';
import { CLASS_BASE } from '../views/constants';
import {
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';
import { PaginationButton } from '../components/PaginationButton';

export interface PaginationProps {
  page?: number;
  hasNextPage?: boolean;
  onPaginate?: (page: number) => void;
  highestPageVisited?: number;
}

const BLOCK_NAME = `${CLASS_BASE}__pagination`;

export const Pagination = ({
  page,
  hasNextPage,
  onPaginate,
  highestPageVisited,
}: PaginationProps): React.JSX.Element | null => {
  if (!page) return null;

  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedListElement className={`${BLOCK_NAME}-list`}>
        <ListItemElement className={`${BLOCK_NAME}-list-item`}>
          <PaginationButton
            disabled={page <= 1}
            onClick={() => {
              if (onPaginate) onPaginate(page - 1);
            }}
            type="previous"
          />
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}-list-item`}>
          <SpanElement
            aria-label={`Page ${page}`}
            aria-current="page"
            className={`${BLOCK_NAME}-current`}
          >
            {page}
          </SpanElement>
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}-list-item`}>
          <PaginationButton
            disabled={
              !highestPageVisited ||
              (page >= highestPageVisited && !hasNextPage)
            }
            onClick={() => {
              if (onPaginate) onPaginate(page + 1);
            }}
            type="next"
          />
        </ListItemElement>
      </OrderedListElement>
    </NavElement>
  );
};
