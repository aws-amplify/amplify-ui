import { Property } from 'csstype';

import { ResponsiveStyle, CSSLayoutStyleProps } from './style';
import { ViewProps } from './view';

export type GridSpanType = number | 'auto';

export interface GridContainerStyleProps extends CSSLayoutStyleProps {
  autoColumns?: ResponsiveStyle<Property.GridAutoColumns>;
  autoFlow?: ResponsiveStyle<Property.GridAutoFlow>;
  autoRows?: ResponsiveStyle<Property.GridAutoRows>;
  templateAreas?: ResponsiveStyle<Property.GridTemplateAreas>;
  templateColumns?: ResponsiveStyle<Property.GridTemplateColumns>;
  templateRows?: ResponsiveStyle<Property.GridTemplateRows>;
}

export interface GridItemStyleProps {
  area?: ResponsiveStyle<Property.GridArea>;
  column?: ResponsiveStyle<Property.GridColumn>;
  columnEnd?: ResponsiveStyle<Property.GridColumnEnd>;
  columnSpan?: ResponsiveStyle<GridSpanType>;
  columnStart?: ResponsiveStyle<Property.GridColumnStart>;
  row?: ResponsiveStyle<Property.GridRow>;
  rowEnd?: ResponsiveStyle<Property.GridRowEnd>;
  rowSpan?: ResponsiveStyle<GridSpanType>;
  rowStart?: ResponsiveStyle<Property.GridRowStart>;
}

export interface GridProps extends GridContainerStyleProps, ViewProps {}
