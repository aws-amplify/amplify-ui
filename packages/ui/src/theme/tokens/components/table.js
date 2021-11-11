module.exports = {
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

  /**
   * Default table summary styles
   */
  summary: {
    color: { value: '{colors.font.secondary.value}' },
    fontSize: { value: '{fontSizes.xs.value}' },
    fontWeight: { value: '{fontWeights.light.value}' },

    large: {
      fontSize: { value: '{fontSizes.small.value}' },
    },

    small: {
      fontSize: { value: '{fontSizes.xs.value}' },
    },
  },
};
