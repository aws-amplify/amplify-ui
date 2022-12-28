import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type BaseTableTokens<Output> = DesignTokenProperties<
  'display' | 'verticalAlign',
  Output
>;

type TableCellTokens<Output> = DesignTokenProperties<
  | 'borderColor'
  | 'borderStyle'
  | 'borderWidth'
  | 'color'
  | 'display'
  | 'fontSize'
  | 'fontWeight'
  | 'padding'
  | 'verticalAlign',
  Output
> & {
  large?: TableCellSizeTokens<Output>;
  small?: TableCellSizeTokens<Output>;
};

type TableCellSizeTokens<Output> = DesignTokenProperties<
  'fontSize' | 'padding',
  Output
>;

type TableCaptionSizeTokens<Output> = DesignTokenProperties<'fontSize', Output>;

export type TableTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'borderCollapse' | 'display' | 'width', Output> & {
    head?: BaseTableTokens<Output>;
    body?: BaseTableTokens<Output>;
    foot?: BaseTableTokens<Output>;
    row?: BaseTableTokens<Output> & {
      hover?: DesignTokenProperties<'backgroundColor', Output>;
      striped?: DesignTokenProperties<'backgroundColor', Output>;
    };
    header?: TableCellTokens<Output>;
    data?: TableCellTokens<Output>;
    caption?: DesignTokenProperties<
      | 'captionSide'
      | 'color'
      | 'display'
      | 'fontSize'
      | 'textAlign'
      | 'wordBreak',
      Output
    > & {
      large?: TableCaptionSizeTokens<Output>;
      small?: TableCaptionSizeTokens<Output>;
    };
  };

export const table: Required<TableTokens<'default'>> = {
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
