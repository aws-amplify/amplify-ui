import { ViewProps } from '../../types';

export type InternalIcon = (
  props: ViewProps & {
    size?: string | number;
  }
) => JSX.Element;
