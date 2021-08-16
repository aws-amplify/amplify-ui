import * as React from 'react';

import { i18n } from './i18n';
import { useRange, ELLIPSIS } from './useRange';
import { PaginationItem } from './PaginationItem';

/**
 * This hook will be used to get the pagination items to be rendered in the pagination primitive
 * @param currentPage current page number
 * @param totalPages total number of pages
 * @param siblingCount the number of siblings on each side of
 * @param onNext callback function triggered when the next-page button is pressed
 * @param onPrevious callback function triggered when the prev-page button is pressed
 * @param onChange callback function triggered every time the page changes
 * @returns an array of pagination items
 */
export const usePaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  onNext: (newPageIdx: number) => void,
  onPrevious: (newPageIdx: number) => void,
  onChange: (newPageIdx: number, prevPageIdx) => void
) => {
  const previousItem = (
    <PaginationItem
      type="previous"
      key="previous"
      currentPage={currentPage}
      onClick={onPrevious}
      isDisabled={currentPage <= 1}
      ariaLabel={i18n.PaginationItem.PreviousItem.ariaLabel}
    />
  );

  const nextItem = (
    <PaginationItem
      type="next"
      key="next"
      currentPage={currentPage}
      onClick={onNext}
      isDisabled={currentPage >= totalPages}
      ariaLabel={i18n.PaginationItem.NextItem.ariaLabel}
    />
  );
  // To get the range of page numbers to be rendered in the pagination primitive
  const range = useRange(currentPage, totalPages, siblingCount);

  const pageItems = React.useMemo(
    () =>
      range.map((item, idx) => {
        if (item === ELLIPSIS) {
          return (
            <PaginationItem
              type="ellipsis"
              key={idx === 1 ? 'start-ellipsis' : 'end-ellipsis'}
            />
          );
        }
        return (
          // Note: Do NOT use index for `key` and instead use page number
          // otherwise, react cannot update the component correctly with its diff mechanism
          <PaginationItem
            key={item}
            type="page"
            page={item as number}
            currentPage={currentPage}
            onClick={onChange}
            ariaLabel={`Go to page ${item}`}
          />
        );
      }),
    [range, currentPage, onChange]
  );
  return [previousItem, ...pageItems, nextItem];
};
