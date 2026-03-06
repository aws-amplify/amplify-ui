import React from 'react';

import { PaginationButton, STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../base';
import {
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../elements';

export interface PaginationProps {
  page?: number;
  hasNextPage?: boolean;
  onPaginate?: (page: number) => void;
  highestPageVisited?: number;
}

export const Pagination = ({
  page,
  hasNextPage,
  onPaginate,
  highestPageVisited,
}: PaginationProps): React.JSX.Element | null => {
  if (!page) return null;

  return (
    <NavElement
      aria-label={'Pagination'}
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination`}
    >
      <OrderedListElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-list`}
      >
        <ListItemElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-list-item`}
        >
          <PaginationButton
            isDisabled={page <= 1}
            onClick={() => {
              if (onPaginate) onPaginate(page - 1);
            }}
            type="previous"
          />
        </ListItemElement>
        <ListItemElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-list-item`}
        >
          <SpanElement
            aria-label={`Page ${page}`}
            aria-current="page"
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-current-page`}
          >
            {page}
          </SpanElement>
        </ListItemElement>
        <ListItemElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__pagination-list-item`}
        >
          <PaginationButton
            isDisabled={
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
