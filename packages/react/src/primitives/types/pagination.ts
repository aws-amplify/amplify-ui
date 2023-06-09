import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type PaginationItemType = 'page' | 'next' | 'previous' | 'ellipsis';
export type PaginationCallbackType = 'onNext' | 'onPrevious' | 'onChange';
export type PaginationLabelType =
  | 'pageLabel'
  | 'currentPageLabel'
  | 'previousLabel'
  | 'nextLabel';

export interface BasePaginationProps extends BaseViewProps {
  /**
   * @description
   * Index of the current page. (starting from 1)
   */
  currentPage?: number;

  /**
   * @description
   * Total number of available pages.
   */
  totalPages: number;

  /**
   * @description
   * The number of siblings on each side of current page.
   */
  siblingCount?: number;

  /**
   * @description
   * Optionally indicates whether there are more pages after `totalPages`. Can be combined with `totalPages` to enable the next button when reaching the last page.
   * @default
   * false
   */
  hasMorePages?: boolean;

  /**
   * @description
   * Set the invisible label for current page.
   * @default
   * "Current Page:"
   */
  currentPageLabel?: string;

  /**
   * @description
   * Set the label text for each page button other than the current page.
   * It will be used to construct the `aria-label` for each page button. e.g, "Go to page 1" for page 1 button
   * @default
   * "Go to page"
   */
  pageLabel?: string;

  /**
   * @description
   * Set the `aria-label` for the left arrow button.
   * @default
   * "Go to previous page"
   */
  previousLabel?: string;

  /**
   * @description
   * Set the `aria-label` for the right arrow button.
   * @default
   * "Go to next page"
   */
  nextLabel?: string;

  /**
   * @description
   * Callback function triggered when the next-page button is pressed
   */
  onNext?: () => void;

  /**
   * @description
   * Callback function triggered when the prev-page button is pressed
   */
  onPrevious?: () => void;

  /**
   * @description
   * Callback function triggered every time the page changes
   */
  onChange?: (newPageIndex?: number, prevPageIndex?: number) => void;
}

export type PaginationProps<Element extends ElementType = 'nav'> =
  PrimitiveProps<BasePaginationProps, Element>;

export interface UsePaginationProps
  extends Omit<
    BasePaginationProps,
    PaginationCallbackType & PaginationLabelType
  > {}

export interface UsePaginationResult
  extends Required<
    Omit<BasePaginationProps, PaginationLabelType | keyof BaseViewProps>
  > {}

export interface BasePaginationItemProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * @description
   * Available item type are 'page', 'next', 'previous' and 'ellipsis'.
   */
  type: PaginationItemType;

  /**
   * @description
   * For 'page' item, this is the page number to be rendered.
   */
  page?: number;

  /**
   * @description
   * The index of current page.
   * @default
   * "Current Page:"
   */
  currentPage?: number;

  /**
   * @description
   * An item is not clickable if disabled
   */
  isDisabled?: boolean;

  /**
   * @description
   * Set the invisible label for current page.
   */
  currentPageLabel?: string;

  /**
   * @description
   * Triggered every time the item is clicked.
   */
  onClick?: () => void;
}

export type PaginationItemProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BasePaginationItemProps, Element>;
