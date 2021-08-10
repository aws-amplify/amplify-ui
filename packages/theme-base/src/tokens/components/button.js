module.exports = {
  // shared styles
  fontWeight: { value: 'bold' },
  textAlign: { value: 'center' },
  borderRadius: { value: '{radii.medium.value}' },
  transitionDuration: { value: '{time.transition.medium.value}' },
  fontSize: { value: '{fontSizes.medium.value}' },
  paddingVertical: { value: '{space.small.value}' },
  paddingHorizontal: { value: '{space.medium.value}' },
  borderColor: { value: '{colors.brand.primary.20.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  color: { value: '{colors.brand.primary.80.value}' },

  hover: {
    color: { value: '{colors.brand.primary.90.value}' },
    backgroundColor: { value: '{colors.brand.primary.10.value}' },
    borderColor: { value: '{colors.brand.primary.60.value}' },
  },
  focus: {
    color: { value: '{colors.brand.primary.90.value}' },
    borderColor: { value: '{colors.brand.primary.90.value}' },
  },
  active: {
    color: { value: '{colors.font.inverse.value}' },
    backgroundColor: { value: '{colors.brand.primary.100.value}' },
    borderColor: { value: '{colors.brand.primary.100.value}' },
  },
  loading: {
    color: { value: '{colors.font.tertiary.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },
  disabled: {
    color: { value: '{colors.font.tertiary.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },

  // variations
  primary: {
    borderWidth: { value: 0 },
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
    color: { value: '{colors.font.inverse.value}' },
    disabled: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
      color: { value: '{colors.font.tertiary.value}' },
    },
    loading: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
      color: { value: '{colors.font.tertiary.value}' },
    },
    hover: {
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
    },
    focus: {
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
    },
    active: {
      backgroundColor: { value: '{colors.brand.primary.100.value}' },
    },
  },

  link: {
    borderWidth: { value: 0 },
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.interactive.value}' },
    hover: {
      color: { value: '{colors.font.hover.value}' },
    },
    focus: {
      color: { value: '{colors.font.focus.value}' },
    },
    active: {
      color: { value: '{colors.font.active.value}' },
    },
    disabled: {
      color: { value: '{colors.font.tertiary.value}' },
    },
    loading: {
      color: { value: '{colors.font.tertiary.value}' },
    },
  },

  // sizes
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
    paddingVertical: { value: '{space.xs.value}' },
    paddingHorizontal: { value: '{space.small.value}' },
    borderRadius: { value: '{radii.medium.value}' },
  },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
    paddingVertical: { value: '{space.medium.value}' },
    paddingHorizontal: { value: '{space.large.value}' },
    borderRadius: { value: '{radii.medium.value}' },
  },
};
