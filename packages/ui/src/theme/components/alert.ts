import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export interface AlertTheme
  extends BaseProperties,
    Modifiers<ColorTheme>,
    Elements<'icon' | 'heading' | 'body' | 'dismiss'> {}
