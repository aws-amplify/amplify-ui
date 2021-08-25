import { BaseComponentProps, AriaProps } from './base';

import { BaseStyleProps } from './style';

export interface TabsProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps {
  /**
   * Explain. Defaults to zero (0). Index of active tab.
   */
  defaultTabIndex?: number;
}
