import {
  DesignTokenValues,
  OutputVariantKey,
  TransformValue,
} from './types/designToken';

type TransformSize = 'small' | 'medium' | 'large';

export type BaseTransforms<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = {
  slideX?: DesignTokenValues<TransformSize, TransformValue, Output, Platform>;
};

// `Transforms` tokens requires special handling for `required` output due to nested tokens
export type Transforms<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = Output extends 'required' | 'default'
  ? Required<BaseTransforms<Output, Platform>>
  : BaseTransforms<Output, Platform>;

export const transforms: Transforms<'default'> = {
  // TODO: make this more generic and cross-platform
  slideX: {
    small: { value: 'translateX(0.5em)' },
    medium: { value: 'translateX(1em)' },
    large: { value: 'translateX(2em)' },
  },
};
