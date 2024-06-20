import { BaseProperties, Modifiers, Size } from './utils';

export type RatingTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size> & {
    _element?: {
      item?: BaseProperties;
      icon?: BaseProperties & Modifiers<'filled' | 'empty'>;
    };
  };
