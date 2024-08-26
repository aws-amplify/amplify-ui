import { ComponentStyles, Elements } from './utils';

export type SearchFieldTheme<Required extends boolean = false> =
  ComponentStyles & Elements<{ search?: ComponentStyles }, Required>;
