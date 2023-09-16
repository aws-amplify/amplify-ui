import { CSSProperties, ComponentTheme, WithStates } from './utils';

type Elements = 'list' | 'separator' | 'item' | 'link';

export type BreadcrumbsTheme = ComponentTheme<
  {
    element?: {
      [key in Elements]?: CSSProperties & WithStates;
    };
  } & CSSProperties
>;
