import { Modifiers, BaseProperties, Size } from './utils';

export type PlaceholderTheme<Required extends boolean = false> =
  BaseProperties & Modifiers<Size, Required>;
