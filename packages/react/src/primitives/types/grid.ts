import { Property } from 'csstype';
import { AriaProps, BaseComponentProps } from './base';

import { ResponsiveStyle, CSSLayoutStyleProps } from './style';

export interface GridContainerStyleProps extends CSSLayoutStyleProps {
  area?: ResponsiveStyle<Property.GridArea>;
  autoColumns?: ResponsiveStyle<Property.GridAutoColumns>;
  autoFlow?: ResponsiveStyle<Property.GridAutoFlow>;
  autoRows?: ResponsiveStyle<Property.GridAutoRows>;
  columnGap?: ResponsiveStyle<Property.GridColumnGap>;
  rowGap?: ResponsiveStyle<Property.GridRowGap>;
  templateAreas?: ResponsiveStyle<Property.GridTemplateAreas>;
  templateColumns?: ResponsiveStyle<Property.GridTemplateColumns>;
  templateRows?: ResponsiveStyle<Property.GridTemplateRows>;
}

export interface GridItemStyleProps {
  column?: ResponsiveStyle<Property.GridColumn>;
  columnEnd?: ResponsiveStyle<Property.GridColumnEnd>;
  columnSpan?: ResponsiveStyle<number | 'auto'>;
  columnStart?: ResponsiveStyle<Property.GridColumnStart>;
  row?: ResponsiveStyle<Property.GridRow>;
  rowEnd?: ResponsiveStyle<Property.GridRowEnd>;
  rowSpan?: ResponsiveStyle<number | 'auto'>;
  rowStart?: ResponsiveStyle<Property.GridRowStart>;
}

export interface GridProps
  extends BaseComponentProps,
    AriaProps,
    GridContainerStyleProps {}
