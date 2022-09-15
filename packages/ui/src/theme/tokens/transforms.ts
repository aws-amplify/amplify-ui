import {
  DesignToken,
  WebDesignToken,
  TransformValue,
  ReactNativeDesignToken,
} from './types/designToken';

export type Transforms = {
  slideX: {
    small: DesignToken<TransformValue>;
    medium: DesignToken<TransformValue>;
    large: DesignToken<TransformValue>;
  };
};

export type WebTransforms = {
  slideX: {
    [Property in keyof Transforms['slideX']]: WebDesignToken<TransformValue>;
  };
};

export type ReactNativeTransforms = {
  slideX: {
    [Property in keyof Transforms['slideX']]: ReactNativeDesignToken<TransformValue>;
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
