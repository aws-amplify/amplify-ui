import { createComponentTheme } from '../createTheme';
import { BaseProperties, Elements } from './utils';

export type AccordionTheme<Required extends boolean = false> = BaseProperties &
  Elements<'item' | 'item__trigger' | 'item__content' | 'item__icon', Required>;

export const accordionTheme = createComponentTheme<AccordionTheme<true>>({
  name: 'accordion',
  theme(tokens) {
    return {
      _element: {
        item: {},
        item__content: {},
        item__icon: {},
        item__trigger: {},
      },
    };
  },
});
