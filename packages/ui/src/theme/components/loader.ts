import { createComponentTheme } from '../createTheme';
import { BaseProperties, Elements, Modifiers, Size } from './utils';

export type LoaderTheme<Required extends boolean = false> = BaseProperties &
  Elements<'label', Required> &
  Modifiers<Size, Required>;

export const loaderTheme = createComponentTheme<LoaderTheme<true>>({
  name: 'loader',
  theme(tokens) {
    const {
      components: { loader },
    } = tokens;
    return {
      listStyleType: 'none',
      _modifiers: {
        large: {},
        small: {},
      },
      _element: {
        label: {},
      },
    };
  },
});
