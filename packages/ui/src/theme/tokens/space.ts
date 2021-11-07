import { DesignToken, WebDesignToken, SpaceValue } from './types/designToken';

type SpaceKeys =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'small'
  | 'medium'
  | 'large'
  | 'xl'
  | 'xxl'
  | 'xxxl';

export type Space = {
  /**
   * Smallest space value, used as spacing between
   * small parts of components like pagination and fields.
   * default value: 0.25rem / 4px
   */
  xxxs: DesignToken<SpaceValue>;
  /**
   * Smallest space value, used in badges and pagination.
   * default value: 0.375rem / 6px
   */
  xxs: DesignToken<SpaceValue>;
  /**
   * default value: 0.5rem / 8px
   */
  xs: DesignToken<SpaceValue>;
  small: DesignToken<SpaceValue>;
  /**
   * Base space, used in lots of places
   */
  medium: DesignToken<SpaceValue>;
  large: DesignToken<SpaceValue>;
  xl: DesignToken<SpaceValue>;
  xxl: DesignToken<SpaceValue>;
  xxxl: DesignToken<SpaceValue>;
  relative: {
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
};

export type WebSpace = {
  [key in SpaceKeys]: WebDesignToken<SpaceValue>;
} & {
  relative: {
    [key in SpaceKeys]: WebDesignToken<SpaceValue>;
  };
};

export const space: Space = {
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
    xxs: { value: '0.375rem' },
    xs: { value: '0.5em' },
    small: { value: '0.75em' },
    medium: { value: '1em' },
    large: { value: '1.5em' },
    xl: { value: '2.0em' },
    xxl: { value: '3.0em' },
    xxxl: { value: '4.5em' },
  },
};
