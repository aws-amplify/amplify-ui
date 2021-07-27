module.exports = {
  // Default styles
  lineHeight: { value: 1 },
  fontWeight: { value: '{fontWeights.semibold.value}' },
  fontSize: { value: '{fontSizes.small.value}' },
  textAlign: { value: 'center' },
  padding: { value: ['{space.xs.value}', '{space.small.value}'] },
  backgroundColor: { value: '{colors.background.tertiary.value}' },
  // An arbitrarily large value to ensure that the left and right sides of the badge are perfectly rounded for any size variation
  borderRadius: { value: '9999px' },

  // Variations
  info: {
    backgroundColor: { value: '{colors.background.info.value}' },
  },

  warning: {
    backgroundColor: { value: '{colors.background.warning.value}' },
  },

  success: {
    backgroundColor: { value: '{colors.background.success.value}' },
  },

  error: {
    backgroundColor: { value: '{colors.background.error.value}' },
  },

  // Sizes
  small: {
    fontSize: { value: '{fontSizes.xs.value}' },
    padding: { value: ['{space.xxs.value}', '{space.xs.value}'] },
  },
  // medium: {
  //   fontSize: { value: '{fontSizes.small.value}' },
  //   padding: { value: ['{space.xxs.value}', '{space.xs.value}'] },
  // },
  large: {
    fontSize: { value: '{fontSizes.medium.value}' },
    padding: { value: ['{space.small.value}', '{space.medium.value}'] },
  },
};
