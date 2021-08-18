import { BaseComponentProps } from './base';

import { BaseStyleProps } from './style';

export type AlertVariation = 'info' | 'error' | 'warning' | 'success';

export interface AlertProps extends BaseComponentProps, BaseStyleProps {
  variation?: AlertVariation;

  isDismissible?: boolean; // default false

  onDismiss?: () => void;

  withIcon?: boolean; // default true

  title?: string;
}
