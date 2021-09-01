module.exports = {
  // shared styles
  fontWeight: { value: 'bold' },
  textAlign: { value: 'center' },
  // borderRadius: { value: '{radii.medium.value}' },
  transitionDuration: { value: '{time.transition.medium.value}' },
  fontSize: { value: '{fontSizes.medium.value}' },
  padding: { value: ['{space.small.value}', '{space.medium.value}'] },
  borderColor: { value: '{colors.brand.primary.20.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  color: { value: 'gray' },

  _hover: {
    color: { value: '{colors.brand.primary.90.value}' },
    backgroundColor: { value: '{colors.brand.primary.10.value}' },
    borderColor: { value: '{colors.brand.primary.60.value}' },
  },
  _focus: {
    color: { value: '{colors.brand.primary.90.value}' },
    borderColor: { value: '{colors.brand.primary.90.value}' },
  },
  _active: {
    color: { value: '{colors.font.inverse.value}' },
    backgroundColor: { value: '{colors.brand.primary.100.value}' },
    borderColor: { value: '{colors.brand.primary.100.value}' },
  },
  _loading: {
    color: { value: '{colors.font.tertiary.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },
  _disabled: {
    color: { value: '{colors.font.tertiary.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },

  // sizes
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
    padding: { value: ['{space.xs.value}', '{space.small.value}'] },
    borderRadius: { value: '{radii.medium.value}' },
  },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
    padding: { value: ['{space.medium.value}', '{space.large.value}'] },
    borderRadius: { value: '{radii.medium.value}' },
  },
};
