module.exports = {
  backgroundColor: { value: 'rgb(245, 245, 245)' },
  boxShadow: { value: 'inset 0 -2px rgb(201, 201, 201)' },
  marginBottom: { value: '1rem' },

  item: {
    backgroundColor: { value: 'transparent' },
    color: {
      primary: { value: 'gray' },
      active: { value: '#7e62ff' },
    },
    fontWeight: { value: 'bold' },
    textAlign: { value: 'center' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    fontSize: { value: '{fontSizes.medium.value}' },
    padding: { value: ['{space.small.value}', '{space.medium.value}'] },
    borderColor: { value: '{colors.black.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },

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
  },
};
