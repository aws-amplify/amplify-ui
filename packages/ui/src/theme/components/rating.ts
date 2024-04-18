import { BaseProperties, Modifiers, Size } from './utils';

export interface RatingTheme extends BaseProperties, Modifiers<Size> {
  _element?: {
    item?: BaseProperties;
    icon?: BaseProperties & Modifiers<'filled' | 'empty'>;
  };
}
