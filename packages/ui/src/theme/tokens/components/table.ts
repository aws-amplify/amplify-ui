import {
  BackgroundColorValue,
  BorderCollapseValue,
  BorderColorValue,
  BorderStyleValue,
  BorderWidthValue,
  CaptionSideValue,
  ColorValue,
  DesignToken,
  DisplayValue,
  FontSizeValue,
  FontWeightValue,
  SpaceValue,
  TextAlignValue,
  VerticalAlignValue,
  WordBreakValue,
} from '../types/designToken';

interface TableDefaultTokens {
  display: DesignToken<DisplayValue>;
  verticalAlign: DesignToken<VerticalAlignValue>;
}

interface TableRowTokens extends TableDefaultTokens {
  hover: TableRowHoverTokens;
  striped: TableRowStripedTokens;
}

interface TableRowHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface TableRowStripedTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface TableCellTokens extends TableDefaultTokens {
  borderColor: DesignToken<BorderColorValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
  padding: DesignToken<SpaceValue>;
  large: TableCellSizeTokens;
  small: TableCellSizeTokens;
}

interface TableHeaderTokens extends TableCellTokens {}

interface TableDataTokens extends TableCellTokens {}

interface TableCellSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
  padding: DesignToken<SpaceValue>;
}

interface TableCaptionTokens {
  captionSide: DesignToken<CaptionSideValue>;
  color: DesignToken<ColorValue>;
  display: DesignToken<DisplayValue>;
  fontSize: DesignToken<FontSizeValue>;
  textAlign: DesignToken<TextAlignValue>;
  wordBreak: DesignToken<WordBreakValue>;
  large: TableCaptionSizeTokens;
  small: TableCaptionSizeTokens;
}

interface TableCaptionSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
}

export interface TableTokens {
  borderCollapse: DesignToken<BorderCollapseValue>;
  display: DesignToken<DisplayValue>;
  width: DesignToken<SpaceValue>;
  head: TableDefaultTokens;
  body: TableDefaultTokens;
  foot: TableDefaultTokens;
  row: TableRowTokens;
  header: TableHeaderTokens;
  data: TableDataTokens;
  caption: TableCaptionTokens;
}

export const table: TableTokens = {
  /**
   * Default table styles
   */
  borderCollapse: { value: 'collapse' },
  display: { value: 'table' },
  width: { value: '100%' },

  /**
   * Default table head styles
   */
  head: {
    display: { value: 'table-header-group' },
    verticalAlign: { value: 'middle' },
  },

  /**
   * Default table body styles
   */
  body: {
    display: { value: 'table-row-group' },
    verticalAlign: { value: 'middle' },
  },

  /**
   * Default table foot styles
   */
  foot: {
    display: { value: 'table-footer-group' },
    verticalAlign: { value: 'middle' },
  },

  /**
   * Default table row styles
   */
  row: {
    display: { value: 'table-row' },
    verticalAlign: { value: 'middle' },

    hover: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
    },

    striped: {
      backgroundColor: { value: '{colors.background.secondary.value}' },
    },
  },

  /**
   * Default table header cell styles
   */
  header: {
    borderColor: { value: '{colors.border.tertiary.value}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.small.value}' },
    color: { value: '{colors.font.primary.value}' },
    display: { value: 'table-cell' },
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
    padding: { value: '{space.medium.value}' },
    verticalAlign: { value: 'middle' },

    large: {
      fontSize: { value: '{fontSizes.large.value}' },
      padding: { value: '{space.large.value}' },
    },

    small: {
      fontSize: { value: '{fontSizes.small.value}' },
      padding: { value: '{space.xs.value}' },
    },
  },

  /**
   * Default table data cell styles
   */
  data: {
    borderColor: { value: '{colors.border.tertiary.value}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.small.value}' },
    color: { value: '{colors.font.primary.value}' },
    display: { value: 'table-cell' },
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.normal.value}' },
    padding: { value: '{space.medium.value}' },
    verticalAlign: { value: 'middle' },

    large: {
      fontSize: { value: '{fontSizes.large.value}' },
      padding: { value: '{space.large.value}' },
    },

    small: {
      fontSize: { value: '{fontSizes.small.value}' },
      padding: { value: '{space.xs.value}' },
    },
  },

  /**
   * Default table caption styles
   */
  caption: {
    captionSide: { value: 'bottom' },
    color: { value: '{colors.font.primary.value}' },
    display: { value: 'table-caption' },
    fontSize: { value: '{fontSizes.medium.value}' },
    textAlign: { value: 'center' },
    wordBreak: { value: 'break-all' },

    large: {
      fontSize: { value: '{fontSizes.large.value}' },
    },

    small: {
      fontSize: { value: '{fontSizes.small.value}' },
    },
  },
};
