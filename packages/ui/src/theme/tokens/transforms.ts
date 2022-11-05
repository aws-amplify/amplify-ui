import {
  DesignToken,
  WebDesignToken,
  TransformValue,
} from './types/designToken';

type TransformSize = 'small' | 'medium' | 'large';

export type Transforms = {
  slideX: Record<TransformSize, DesignToken<TransformValue> | TransformSize>;
};

export type WebTransforms = {
  slideX: Record<TransformSize, WebDesignToken<TransformValue>>;
};

export const transforms: Transforms = {
  // TODO: make this more generic and cross-platform
  slideX: {
    small: { value: 'translateX(0.5em)' },
    medium: { value: 'translateX(1em)' },
    large: { value: 'translateX(2em)' },
  },
};
