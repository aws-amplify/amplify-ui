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
export declare const usePaginationItems: (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  onNext: () => void,
  onPrevious: () => void,
  onChange: (newPageIdx: number, prevPageIdx: any) => void
) => JSX.Element[];
