import { Modifiers, BaseProperties, Elements, ColorTheme, Size } from './utils';

export interface BadgeTheme
  extends BaseProperties,
    Modifiers<Size | ColorTheme>,
    Elements<'icon' | 'heading' | 'body' | 'dismiss'> {}
