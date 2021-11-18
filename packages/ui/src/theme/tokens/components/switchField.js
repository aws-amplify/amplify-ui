module.exports = {
  disabled: {
    opacity: { value: '{opacities.30.value}' },
  },
  focused: {
    shadow: { value: '{shadows.small.value}' },
  },
  label: {
    padding: { value: '{space.xs.value}' },
  },
  large: {
    font: {
      size: { value: '{fontSizes.large.value}' },
    },
  },
  small: {
    font: {
      size: { value: '{fontSizes.small.value}' },
    },
  },
  thumb: {
    background: { value: '{colors.white.value}' },
    border: {
      color: { value: '{colors.neutral.20.value}' },
      radius: { value: '{radii.xxxl.value}' },
    },
    checked: {
      transform: { value: '{transforms.slideX.medium.value}' },
    },
    transition: {
      duration: { value: '{time.medium.value}' },
    },
    width: { value: '{space.relative.medium.value}' },
  },
  track: {
    backgroundColor: { value: '{colors.background.tertiary.value}' },
    border: {
      radius: { value: '{radii.xxxl.value}' },
    },
    checked: {
      backgroundColor: { value: '{colors.brand.primary.600.value}' },
    },
    height: { value: '{space.relative.medium.value}' },
    padding: { value: '{outlineWidths.medium.value}' },
    transition: {
      duration: { value: '{time.short.value}' },
    },
    width: { value: '{space.relative.xl.value}' },
  },
};
