import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';

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
  onNext?: (newPageIndex: number) => void;

  /**
   * Triggered when the prev-page button is pressed
   */
  onPrevious?: (newPageIndex: number) => void;

  /**
   * Triggered every time the page changes
   */
  onChange?: (newPageIndex: number, prevPageIndex: number) => void;
}
