import { DesignToken, WebDesignToken, SpaceValue } from './types/designToken';

export type SpaceSizes = {
  xxxs: DesignToken<SpaceValue>;
  xxs: DesignToken<SpaceValue>;
  xs: DesignToken<SpaceValue>;
  small: DesignToken<SpaceValue>;
  medium: DesignToken<SpaceValue>;
  large: DesignToken<SpaceValue>;
  xl: DesignToken<SpaceValue>;
  xxl: DesignToken<SpaceValue>;
  xxxl: DesignToken<SpaceValue>;
};

export type Space = SpaceSizes & {
  zero: DesignToken<SpaceValue>;
  relative: SpaceSizes & {
    full: DesignToken<SpaceValue>;
  };
};

export type WebSpace = {
  [Property in keyof Omit<Space, 'relative'>]: WebDesignToken<SpaceValue>;
} & {
  relative: {
    [Property in keyof Space['relative']]: WebDesignToken<SpaceValue>;
  };
};

export const space: Space = {
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
