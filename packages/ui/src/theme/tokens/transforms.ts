import {
  DesignToken,
  WebDesignToken,
  TransformValue,
} from './types/designToken';

type TransformKeys = 'small' | 'medium' | 'large';

export type Transforms = {
  slideX: {
    [key in TransformKeys]: DesignToken<TransformValue>;
  };
};

export type WebTransforms = {
  slideX: {
    [key in TransformKeys]: WebDesignToken<TransformValue>;
  };
};

export const transforms: Transforms = {
  // TODO: make this more generic and cross-platform
  slideX: {
    small: { value: 'translateX(0.5em)' },
    medium: { value: 'translateX(1em)' },
    large: { value: 'translateX(2em)' },
  },
};
