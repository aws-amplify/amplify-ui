import { DesignTokenValues, TransformValue } from './types/designToken';

type TransformSize = 'small' | 'medium' | 'large';

export type Transforms<Output = unknown, Platform = unknown> = {
  slideX: DesignTokenValues<TransformSize, TransformValue, Output, Platform>;
};

export const transforms: Transforms = {
  // TODO: make this more generic and cross-platform
  slideX: {
    small: { value: 'translateX(0.5em)' },
    medium: { value: 'translateX(1em)' },
    large: { value: 'translateX(2em)' },
  },
};
