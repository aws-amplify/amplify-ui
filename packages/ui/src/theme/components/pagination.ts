import { createComponentTheme } from '../createTheme';
import { BaseProperties, Elements, Modifiers } from './utils';

export type PaginationTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    'item',
    Required,
    BaseProperties & Modifiers<'ellipsis' | 'current' | 'disabled'>
  >;

export const paginationTheme = createComponentTheme<PaginationTheme<true>>({
  name: 'pagination',
  theme(tokens) {
    const {
      components: { pagination },
    } = tokens;
    return {
      listStyleType: 'none',
      _element: {
        item: {
          height: pagination.itemShared.height,
          minWidth: pagination.itemShared.minWidth,
          _modifiers: {
            type: {
              disabled: {},
              current: {},
              ellipsis: {},
            },
          },
        },
      },
    };
  },
});
