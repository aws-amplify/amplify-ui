module.exports = {
  backgroundColor: { value: '{colors.neutral.10.value}' },
  boxShadow: { value: 'inset 0 -2px {colors.neutral.60.value}' },
  marginBottom: { value: '{space.medium.value}' },

  item: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderColor: { value: '{colors.black.value}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    color: {
      primary: { value: '{colors.neutral.80.value}' },
      active: { value: '{colors.brand.primary.80.value}' },
    },
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
    padding: { value: ['{space.small.value}', '{space.medium.value}'] },
    textAlign: { value: 'center' },
    transitionDuration: { value: '{time.transition.medium.value}' },

    _hover: {
      color: { value: '{colors.brand.primary.90.value}' },
    },
    _focus: {
      backgroundColor: { value: '{colors.neutral.20.value}' },
    },
    _active: {
      backgroundColor: { value: '{colors.neutral.40.value}' },
    },
    _disabled: {
      color: { value: '{colors.font.tertiary.value}' },
      backgroundColor: { value: '{colors.transparent.value}' },
      borderColor: { value: '{colors.border.tertiary.value}' },
    },
  },
};
