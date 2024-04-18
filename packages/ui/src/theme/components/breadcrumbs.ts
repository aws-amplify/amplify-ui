import { BaseProperties, Elements } from './utils';

export interface BreadcrumbsTheme
  extends BaseProperties,
    Elements<'list' | 'separator' | 'item' | 'link'> {}
