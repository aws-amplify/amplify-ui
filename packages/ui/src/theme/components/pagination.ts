import { ComponentStyles, Elements, Modifiers } from './utils';

export type PaginationTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        item?: ComponentStyles & Modifiers<'ellipsis' | 'current' | 'disabled'>;
      },
      Required
    >;
