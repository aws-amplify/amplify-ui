import { DesignTokenValues, TimeValue } from './types/designToken';

type Duration = 'short' | 'medium' | 'long';

export type Time<Output = unknown, Platform = unknown> = DesignTokenValues<
  Duration,
  TimeValue<Platform>,
  Output,
  Platform
>;

export type ReactNativeTime = Time<unknown, 'mobile'>;

export const time: Time = {
  short: { value: '100ms' },
  medium: { value: '250ms' },
  long: { value: '500ms' },
};
