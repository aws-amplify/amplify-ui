import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';
import { ViewProps } from './view';

export type PaginationItemType = 'page' | 'next' | 'previous' | 'ellipsis';
export type PaginationCallbackType = 'onNext' | 'onPrevious' | 'onChange';
export type PaginationLabelType =
  | 'pageLabel'
  | 'currentPageLabel'
  | 'previousLabel'
  | 'nextLabel';

interface BasePaginationProps {
  /**
   * Index of the current page. (starting from 1)
   */
  currentPage?: number;

  /**
   * Total number of available pages.
   */
  totalPages: number;

  /**
   * The number of siblings on each side of current page.
   */
  siblingCount?: number;

  /**
   * Optionally indicates whether there are more pages after `totalPages`. Can be combined with `totalPages` to enable the next button when reaching the last page.
   * @default false
   */
  hasMorePages?: boolean;

  /**
   * Set the invisible label for current page.
   * @default "Current Page:"
   */
  currentPageLabel?: string;

  /**
   * Set the label text for each page button other than the current page.
   * It will be used to construct the `aria-label` for each page button. e.g, "Go to page 1" for page 1 button
   * @default "Go to page"
   */
  pageLabel?: string;

  /**
   * Set the `aria-label` for the left arrow button.
   * @default "Go to previous page"
   */
  previousLabel?: string;

  /**
   * Set the `aria-label` for the right arrow button.
   * @default "Go to next page"
   */
  nextLabel?: string;

  /**
   * Callback function triggered when the next-page button is pressed
   */
  onNext?: () => void;

  /**
   * Callback function triggered when the prev-page button is pressed
   */
  onPrevious?: () => void;

  /**
   * Callback function triggered every time the page changes
   */
  onChange?: (newPageIndex: number, prevPageIndex: number) => void;
}

export interface PaginationProps extends BasePaginationProps, ViewProps {}

export interface UsePaginationProps
  extends Omit<
    BasePaginationProps,
    PaginationCallbackType & PaginationLabelType
  > {}

export interface UsePaginationResult
  extends Required<Omit<BasePaginationProps, PaginationLabelType>> {}

export interface PaginationItemProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * Available item type are 'page', 'next', 'previous' and 'ellipsis'.
   */
  type: PaginationItemType;

  /**
   * For 'page' item, this is the page number to be rendered.
   */
  page?: number;

  /**
   * The index of current page.
   */
  currentPage?: number;

  /**
   * An item is not clickable if disabled
   */
  isDisabled?: boolean;

  /**
   * Set the invisible label for current page.
   * @default "Current Page:"
   */
  currentPageLabel?: string;

  /**
   * Triggered every time the item is clicked.
   */
  onClick?: (newPageIndex?: number, prevPageIndex?: number) => void;
}
