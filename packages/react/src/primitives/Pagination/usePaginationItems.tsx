import * as React from 'react';

import { useRange, ELLIPSIS } from './useRange';
import { PaginationItem } from './PaginationItem';
import { ComponentText } from '../shared/constants';

interface UsePaginationItemsProps {
  currentPage: number;
  totalPages: number;
  hasMorePages: boolean;
  siblingCount?: number;
  currentPageLabel: string;
  pageLabel: string;
  previousLabel: string;
  nextLabel: string;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange: (newPageIndex: number, prevPageIndex: number) => void;
}

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
export const usePaginationItems = ({
  currentPage,
  totalPages,
  hasMorePages,
  siblingCount,
  currentPageLabel = ComponentText.PaginationItem.currentPageLabel,
  pageLabel = ComponentText.PaginationItem.pageLabel,
  previousLabel = ComponentText.PaginationItem.previousLabel,
  nextLabel = ComponentText.PaginationItem.nextLabel,
  onNext,
  onPrevious,
  onChange,
}: UsePaginationItemsProps) => {
  const previousItem = (
    <PaginationItem
      type="previous"
      key="previous"
      currentPage={currentPage}
      onClick={onPrevious}
      isDisabled={currentPage <= 1}
      ariaLabel={previousLabel}
    />
  );

  const nextItem = (
    <PaginationItem
      type="next"
      key="next"
      currentPage={currentPage}
      onClick={onNext}
      isDisabled={currentPage >= totalPages && !hasMorePages}
      ariaLabel={nextLabel}
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
            currentPageLabel={currentPageLabel}
            onClick={onChange}
            /**
             * @todo We should consider how we would support interpolation in our string translations.
             * This works for "Go to page 31" or "translatedText {s}" as the supplied string
             * But for Arabic or Japanese or some other languages the supplied string might look like: "{s} translatedText".
             */
            ariaLabel={`${pageLabel} ${item}`}
          />
        );
      }),
    [range, currentPage, currentPageLabel, pageLabel, onChange]
  );
  return [previousItem, ...pageItems, nextItem];
};
