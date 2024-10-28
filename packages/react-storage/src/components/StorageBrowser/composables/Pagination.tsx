import React from 'react';
import { CLASS_BASE } from '../views/constants';
import {
  ButtonElement,
  IconElement,
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';

export interface PaginationProps {
  currentPage: number;
  hasMorePages: boolean;
  handlePaginate: (page: number) => void;
  highestPageVisited: number;
}

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

export const Pagination = ({
  currentPage,
  hasMorePages,
  handlePaginate,
  highestPageVisited,
}: PaginationProps): React.JSX.Element | null => {
  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedListElement className={`${BLOCK_NAME}__list`}>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <ButtonElement
            aria-label="Go to previous page"
            className={`${BLOCK_NAME}__button-previous`}
            disabled={currentPage <= 1}
            onClick={() => handlePaginate(currentPage - 1)}
          >
            <IconElement
              className={`${BLOCK_NAME}__icon`}
              variant="paginate-previous"
            />
          </ButtonElement>
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <ButtonElement
            aria-current="page"
            aria-label={`${currentPage}`}
            className={`${BLOCK_NAME}__button-current`}
          >
            <SpanElement className={`${BLOCK_NAME}__text`}>
              {currentPage}
            </SpanElement>
          </ButtonElement>
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <ButtonElement
            aria-label="Go to next page"
            className={`${BLOCK_NAME}__button-next`}
            disabled={currentPage >= highestPageVisited && !hasMorePages}
            onClick={() => handlePaginate(currentPage + 1)}
          >
            <IconElement
              className={`${BLOCK_NAME}__icon`}
              variant="paginate-next"
            />
          </ButtonElement>
        </ListItemElement>
      </OrderedListElement>
    </NavElement>
  );
};
