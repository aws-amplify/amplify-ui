import {
  DesignTokenValues,
  OutputVariantKey,
  TimeValue,
} from './types/designToken';

type Duration = 'short' | 'medium' | 'long';

export type Time<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<Duration, TimeValue<Platform, Output>, Output, Platform>;

export const time: Time<'default'> = {
  short: { value: '100ms' },
  medium: { value: '250ms' },
  long: { value: '500ms' },
};
