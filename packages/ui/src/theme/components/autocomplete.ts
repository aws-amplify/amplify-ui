import { Modifiers, BaseProperties } from './utils';

export interface AutoCompleteTheme extends BaseProperties {
  _element?: {
    menu?: BaseProperties & Modifiers<'empty' | 'loading'>;
    menu__option?: BaseProperties & Modifiers<'active'>;
    menu__options?: BaseProperties;
  };
}
