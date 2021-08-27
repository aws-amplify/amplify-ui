import { BaseComponentProps } from './base';

import { BaseStyleProps } from './style';

import { IconSize } from './icon';

export type AlertVariation = 'info' | 'error' | 'warning' | 'success';

export interface AlertProps extends BaseComponentProps, BaseStyleProps {
  variation?: AlertVariation;

  isDismissible?: boolean; // default false

  onDismiss?: () => void;

  hasIcon?: boolean; // default true

  iconSize?: IconSize;

  title?: string;
}
