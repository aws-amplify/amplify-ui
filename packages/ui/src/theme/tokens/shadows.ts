import { DesignToken } from './types/designToken';

export interface Shadows {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
  switch: DesignToken;
}

export const shadows: Shadows = {
  // TODO: update these to use an object rather than a string for cross-platform
  // transformations
  small: { value: '0 2px 4px {colors.shadow.tertiary.value}' },
  medium: { value: '0 2px 6px {colors.shadow.secondary.value}' },
  large: { value: '0 4px 12px {colors.shadow.primary.value}' },
  // TODO: either move this to the switch component theme or have it use one of the ones above
  switch: { value: '0 0 4px {colors.black.value}' },
};
