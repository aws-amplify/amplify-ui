import type { ViewProps } from '../../types';

export type InternalIcon = (
  props: ViewProps & {
    size?: string | number;
  }
) => React.JSX.Element;
