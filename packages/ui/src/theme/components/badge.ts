import { Modifiers, BaseProperties, Elements, ColorTheme, Size } from './utils';

export type BadgeTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | ColorTheme> &
  Elements<
    { [key in 'icon' | 'heading' | 'body' | 'dismiss']: BaseProperties },
    Required
  >;
