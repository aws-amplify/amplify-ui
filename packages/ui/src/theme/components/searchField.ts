import { BaseProperties, Elements } from './utils';

export type SearchFieldTheme<Required extends boolean = false> =
  BaseProperties & Elements<{ search?: BaseProperties }, Required>;
