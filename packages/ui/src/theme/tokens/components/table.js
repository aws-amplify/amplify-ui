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
  fontSize: { value: '{fontSizes.medium.value}' },
  fontWeight: {
    td: { value: '{fontWeights.normal.value}' },
    th: { value: '{fontWeights.bold.value}' },
  },

  small: {
    fontSize: { value: '{fontSizes.small.value}' },
    padding: { value: '{space.xs.value}' },
  },

  large: {
    fontSize: { value: '{fontSizes.large.value}' },
    padding: { value: '{space.large.value}' },
  },
};
