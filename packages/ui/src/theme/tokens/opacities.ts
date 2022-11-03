import { DesignToken, WebDesignToken, OpacityValue } from './types/designToken';

export type Opacities = {
  // TODO: Update these so the values aren't directly tied to the names
  0: DesignToken<OpacityValue>;
  10: DesignToken<OpacityValue>;
  20: DesignToken<OpacityValue>;
  30: DesignToken<OpacityValue>;
  40: DesignToken<OpacityValue>;
  50: DesignToken<OpacityValue>;
  60: DesignToken<OpacityValue>;
  70: DesignToken<OpacityValue>;
  80: DesignToken<OpacityValue>;
  90: DesignToken<OpacityValue>;
  100: DesignToken<OpacityValue>;
};

export type WebOpacities = {
  [Property in keyof Opacities]: WebDesignToken<OpacityValue>;
};

export type ReactNativeOpacities = {
  [Property in keyof Opacities]: number;
};

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
