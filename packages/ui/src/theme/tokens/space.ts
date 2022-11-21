import {
  DesignTokenValues,
  OutputVariantKey,
  SpaceValue,
} from './types/designToken';

type SpaceSize =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'small'
  | 'medium'
  | 'large'
  | 'xl'
  | 'xxl'
  | 'xxxl';

export type SpaceSizes<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<
  SpaceSize | 'zero',
  SpaceValue<Platform>,
  Output,
  Platform
>;

type BaseSpace<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = SpaceSizes<Output, Platform> & {
  relative?: DesignTokenValues<
    SpaceSize | 'full',
    SpaceValue,
    Output,
    Platform
  >;
};

// `Space` tokens requires special handling for `required` output due to nested tokens
export type Space<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = Output extends 'required' | 'default'
  ? Required<BaseSpace<Output, Platform>>
  : BaseSpace<Output, Platform>;

export const space: Space<'default'> = {
  zero: { value: '0' },
  xxxs: { value: '0.25rem' },
  xxs: { value: '0.375rem' },
  xs: { value: '0.5rem' },
  small: { value: '0.75rem' },
  medium: { value: '1rem' },
  large: { value: '1.5rem' },
  xl: { value: '2.0rem' },
  xxl: { value: '3.0rem' },
  xxxl: { value: '4.5rem' },
  relative: {
    //creating a second set of sizes using em which will be sized relative to a parent instead of the root
    xxxs: { value: '0.25em' },
    xxs: { value: '0.375em' },
    xs: { value: '0.5em' },
    small: { value: '0.75em' },
    medium: { value: '1em' },
    large: { value: '1.5em' },
    xl: { value: '2.0em' },
    xxl: { value: '3.0em' },
    xxxl: { value: '4.5em' },
    full: { value: '100%' },
  },
};
