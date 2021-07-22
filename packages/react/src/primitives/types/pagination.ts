import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';

export type PaginationItemType = 'page' | 'next' | 'previous' | 'ellipsis';

export interface PaginationProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * Index of the current page. (starting from 1)
   */
  currentPage: number;

  /**
   * Total number of available pages.
   */
  totalPages: number;

  /**
   * Triggered when the next-page button is pressed
   */
  onNext: (newPageIndex: number) => void;

  /**
   * Triggered when the prev-page button is pressed
   */
  onPrevious: (newPageIndex: number) => void;

  /**
   * Triggered every time the page changes
   */
  onChange: (newPageIndex: number, prevPageIndex: number) => void;
}

export interface PaginationItemProps extends BaseComponentProps, AriaProps {
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
   * A 'page' item is considered to be active when it is the current page.
   */
  isActive?: boolean;
  /**
   * The 'next' or 'previosu' item will be disabled when the current page reaches the first or the last page.
   */
  isDisabled?: boolean;
  /**
   * Triggered every time the item is clicked.
   */
  onClick?: (newPageIndex: number, prevPageIndex?: number) => void;
}
