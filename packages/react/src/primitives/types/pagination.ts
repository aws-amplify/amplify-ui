import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';

export type PaginationItemTypes = 'page' | 'next' | 'previous' | 'ellipsis';
export type PaginationCallbackTypes = 'onNext' | 'onPrevious' | 'onChange';

interface BasePaginationProps {
  /**
   * Index of the current page. (starting from 1)
   */
  currentPage: number;

  /**
   * Total number of available pages.
   */
  totalPages: number;

  /**
   * The number of siblings on each side of current page.
   */
  siblingCount?: number;

  /**
   * Callback function triggered when the next-page button is pressed
   */
  onNext: (newPageIndex: number) => void;

  /**
   * Callback function triggered when the prev-page button is pressed
   */
  onPrevious: (newPageIndex: number) => void;

  /**
   * Callback function triggered every time the page changes
   */
  onChange: (newPageIndex: number, prevPageIndex: number) => void;
}

export interface PaginationProps
  extends BasePaginationProps,
    BaseComponentProps,
    BaseStyleProps,
    AriaProps {}

export interface UsePaginationProps
  extends Omit<BasePaginationProps, PaginationCallbackTypes> {}

export interface UsePaginationResult extends Required<BasePaginationProps> {}

export interface PaginationItemProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * Available item type are 'page', 'next', 'previous' and 'ellipsis'.
   */
  type: PaginationItemTypes;
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
   * Triggered every time the item is clicked.
   */
  onClick?: (newPageIndex: number, prevPageIndex?: number) => void;
}
