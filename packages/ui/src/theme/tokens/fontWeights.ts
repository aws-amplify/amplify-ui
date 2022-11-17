import {
  DesignTokenValues,
  FontWeightValue,
  OutputVariantKey,
} from './types/designToken';

type FontWeight =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type FontWeights<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<
  FontWeight,
  FontWeightValue<Platform, Output>,
  Output,
  Platform
>;

export const fontWeights: FontWeights<'default'> = {
  hairline: { value: 100 },
  thin: { value: 200 },
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  semibold: { value: 600 },
  bold: { value: 700 },
  extrabold: { value: 800 },
  black: { value: 900 },
};
