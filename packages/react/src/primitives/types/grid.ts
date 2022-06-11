import { Property } from 'csstype';

import { ResponsiveStyle, CSSLayoutStyleProps } from './style';
import { ViewProps } from './view';

export type GridSpanType = number | string | 'auto';

export interface GridContainerStyleProps extends CSSLayoutStyleProps {
  /**
   * @description
   * `autoColumns` specifies the size of an implicitly-created grid column track or pattern of tracks.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)
   */
  autoColumns?: ResponsiveStyle<Property.GridAutoColumns>;

  /**
   * @description
   * `autoFlow` controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
   */
  autoFlow?: ResponsiveStyle<Property.GridAutoFlow>;

  /**
   * @description
   * `autoRows` specifies the size of an implicitly-created grid row track or pattern of tracks.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
   */
  autoRows?: ResponsiveStyle<Property.GridAutoRows>;

  /**
   * @description
   * `templateAreas` specifies named grid areas, establishing the cells in the grid and assigning them names.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
   */
  templateAreas?: ResponsiveStyle<Property.GridTemplateAreas>;

  /**
   * @description
   * `templateColumns` defines the line names and track sizing functions of the grid columns.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
   */
  templateColumns?: ResponsiveStyle<Property.GridTemplateColumns>;

  /**
   * @description
   * `templateRows` defines the line names and track sizing functions of the grid rows.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
   */
  templateRows?: ResponsiveStyle<Property.GridTemplateRows>;
}

export interface GridItemStyleProps {
  /**
   * @description
   * `area` specifies a grid item's size and location within a grid by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the edges of its grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
   */
  area?: ResponsiveStyle<Property.GridArea>;

  /**
   * @description
   * `column` specifies a grid item's size and location within a grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column)
   */
  column?: ResponsiveStyle<Property.GridColumn>;

  /**
   * @description
   * `columnEnd` property specifies a grid item's end position within the grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the block-end edge of its grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end)
   */
  columnEnd?: ResponsiveStyle<Property.GridColumnEnd>;

  /**
   * @description
   * `columnSpan` property makes it possible for an element to span across all columns when its value is set to all.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span)
   */
  columnSpan?: ResponsiveStyle<GridSpanType>;

  /**
   * @description
   * `columnStart` property specifies a grid item's start position within the grid column by contributing a line, a span, or nothing (automatic) to its grid placement. This start position defines the block-start edge of the grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)
   */
  columnStart?: ResponsiveStyle<Property.GridColumnStart>;

  /**
   * @description
   * `row specifies a grid item's size and location within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row)
   */
  row?: ResponsiveStyle<Property.GridRow>;

  /**
   * @description
   * `rowEnd` specifies a grid item's end position within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-end edge of its grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)
   */
  rowEnd?: ResponsiveStyle<Property.GridRowEnd>;

  rowSpan?: ResponsiveStyle<GridSpanType>;

  /**
   * @description
   * `rowStart` property specifies a grid item's start position within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start edge of its grid area.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)
   */
  rowStart?: ResponsiveStyle<Property.GridRowStart>;
}

export interface GridProps extends GridContainerStyleProps, ViewProps {}
