module.exports = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  padding: { value: ['{space.small.value}', '{space.medium.value}'] },
  borderRadius: { value: '{radii.medium.value}' },
  fontSize: { value: '{fontSizes.medium.value}' },

  small: {
    fontSize: { value: '{fontSizes.small.value}' },
    padding: { value: ['{space.xs.value}', '{space.small.value}'] },
  },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
    padding: { value: ['{space.medium.value}', '{space.large.value}'] },
  },

  _focus: {
    // outline: { value: '{colors.brand.primary.90.value}' },
    // borderColor: { value: '{colors.border.primary.value}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.neutral.20.value}' },
  },
};
