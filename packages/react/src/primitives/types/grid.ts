import { Property } from 'csstype';
import { AriaProps, BaseComponentProps } from './base';

import { ResponsiveStyle, CSSLayoutStyleProps, StyleConverter } from './style';

export interface GridContainerStyleProps extends CSSLayoutStyleProps {
  area?: ResponsiveStyle<Property.GridArea>;
  autoColumns?: ResponsiveStyle<Property.GridAutoColumns>;
  autoFlow?: ResponsiveStyle<Property.GridAutoFlow>;
  autoRows?: ResponsiveStyle<Property.GridAutoRows>;
  columnGap?: ResponsiveStyle<Property.GridColumnGap>;
  gap?: ResponsiveStyle<Property.Gap>;
  rowGap?: ResponsiveStyle<Property.GridRowGap>;
  templateAreas?: ResponsiveStyle<Property.GridTemplateAreas>;
  templateColumns?: ResponsiveStyle<Property.GridTemplateColumns>;
  templateRows?: ResponsiveStyle<Property.GridTemplateRows>;
}
interface ConvertSpanFunction {
  (spanValue: ResponsiveStyle<number | 'auto'>): () => string;
}

export interface GridItemStyleProps {
  column?: ResponsiveStyle<Property.GridColumn | StyleConverter>;
  columnEnd?: ResponsiveStyle<Property.GridColumnEnd>;
  columnSpan?: ResponsiveStyle<number | 'auto'>;
  columnStart?: ResponsiveStyle<Property.GridColumnStart>;
  row?: ResponsiveStyle<Property.GridRow | StyleConverter>;
  rowEnd?: ResponsiveStyle<Property.GridRowEnd>;
  rowSpan?: ResponsiveStyle<number | 'auto'>;
  rowStart?: ResponsiveStyle<Property.GridRowStart>;
}

export interface GridProps
  extends BaseComponentProps,
    AriaProps,
    GridContainerStyleProps {}
