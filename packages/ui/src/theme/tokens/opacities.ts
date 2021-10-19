import { DesignToken } from './types/designToken';

// TODO: Update these so the values aren't directly tied to the names
export interface Opacities {
  0: DesignToken;
  10: DesignToken;
  20: DesignToken;
  30: DesignToken;
  40: DesignToken;
  50: DesignToken;
  60: DesignToken;
  70: DesignToken;
  80: DesignToken;
  90: DesignToken;
  100: DesignToken;
}

export const opacities: Opacities = {
  0: {
    value: '0',
  },
  10: {
    value: '0.1',
  },
  20: {
    value: '0.2',
  },
  30: {
    value: '0.3',
  },
  40: {
    value: '0.4',
  },
  50: {
    value: '0.5',
  },
  60: {
    value: '0.6',
  },
  70: {
    value: '0.7',
  },
  80: {
    value: '0.8',
  },
  90: {
    value: '0.9',
  },
  100: {
    value: '1',
  },
};
