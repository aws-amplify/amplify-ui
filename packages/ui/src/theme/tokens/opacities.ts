import {
  DesignTokenValues,
  OpacityValue,
  OutputVariantKey,
} from './types/designToken';

type OpacityScale = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export type Opacities<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<
  OpacityScale,
  OpacityValue<Platform, Output>,
  Output,
  Platform
>;

export const opacities: Opacities<'default'> = {
  0: { value: '0' },
  10: { value: '0.1' },
  20: { value: '0.2' },
  30: { value: '0.3' },
  40: { value: '0.4' },
  50: { value: '0.5' },
  60: { value: '0.6' },
  70: { value: '0.7' },
  80: { value: '0.8' },
  90: { value: '0.9' },
  100: { value: '1' },
};
