import { ViewProps } from '../types/view';

export interface ExpanderProps extends ViewProps {
  defaultValue?: string | string[];
  value?: string | string[];
  isCollapsible?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  onChange?: (value?: string | string[]) => void;
}
