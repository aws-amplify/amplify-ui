import { BaseProperties, Elements, Modifiers } from './utils';

export type PaginationTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    { item?: BaseProperties & Modifiers<'ellipsis' | 'current' | 'disabled'> },
    Required
  >;
