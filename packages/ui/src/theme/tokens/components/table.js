module.exports = {
  /**
   * Default borders
   */
  borderColor: { value: '{colors.border.tertiary.value}' },
  borderStyle: { value: 'solid' },
  borderWidth: { value: '{borderWidths.small.value}' },

  /**
   * Default padding
   */
  padding: { value: '{space.medium.value}' },

  /**
   * Default font styles
   */
  color: { value: '{colors.font.primary.value}' },
  fontSize: {
    default: { value: '{fontSizes.medium.value}' },
    summary: { value: '{fontSizes.xs.value}' },
  },
  fontWeight: {
    td: { value: '{fontWeights.normal.value}' },
    th: { value: '{fontWeights.bold.value}' },
  },

  /**
   * Default table head styles
   */
  head: {
    display: { value: 'table-header-group' },
    'vertical-align': { value: 'middle' },
    'border-color': { value: 'inherit' },
  },

  /**
   * Default table body styles
   */
  body: {
    display: { value: 'table-row-group' },
    'vertical-align': { value: 'middle' },
    'border-color': { value: 'inherit' },
  },

  /**
   * Default table foot styles
   */
  foot: {
    display: { value: 'table-footer-group' },
    'vertical-align': { value: 'middle' },
    'border-color': { value: 'inherit' },
  },

  /**
   * Default table row styles
   */
  row: {
    display: { value: 'table-row' },
    'vertical-align': { value: 'inherit' },
    'border-color': { value: 'inherit' },
  },

  /**
   * Default table header cell styles
   */
  header: {
    display: { value: 'table-cell' },
    'vertical-align': { value: 'middle' },
    'border-color': { value: '{colors.border.tertiary.value}' },
  },

  small: {
    fontSize: { value: '{fontSizes.small.value}' },
    padding: { value: '{space.xs.value}' },
  },

  large: {
    fontSize: {
      default: { value: '{fontSizes.large.value}' },
      summary: { value: '{fontSizes.small.value}' },
    },
    padding: { value: '{space.large.value}' },
  },
};
