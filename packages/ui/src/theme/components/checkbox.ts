import { Modifiers, BaseProperties, ColorTheme } from './utils';

export interface CheckboxTheme extends BaseProperties, Modifiers<ColorTheme> {
  _element?: {
    button?: BaseProperties & Modifiers<'focused' | 'error' | 'disabled'>;
    icon?: BaseProperties & Modifiers<'checked' | 'indeterminite' | 'disabled'>;
    label?: BaseProperties;
  };
}
