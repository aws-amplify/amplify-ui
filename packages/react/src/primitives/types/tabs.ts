import { BaseComponentProps, AriaProps } from './base';
import { TabItem } from '../Tabs';

import { BaseStyleProps } from './style';

export interface TabsProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps {
  /**
   * Explain. Defaults to zero (0). Index of active tab.
   */
  defaultTabIndex?: number;

  children: typeof TabItem[];
}

export interface TabItemProps {
  title: React.ReactNode;
}
