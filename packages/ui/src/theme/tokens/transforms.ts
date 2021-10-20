import { DesignToken } from './types/designToken';

export interface Transforms {
  slideX: {
    small: DesignToken;
    medium: DesignToken;
    large: DesignToken;
  };
}

export const transforms: Transforms = {
  // TODO: make this more generic and cross-platform
  slideX: {
    small: { value: 'translateX(0.5em)' },
    medium: { value: 'translateX(1em)' },
    large: { value: 'translateX(2em)' },
  },
};
