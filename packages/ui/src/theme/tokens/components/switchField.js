module.exports = {
  disabled: {
    opacity: { value: '{opacities.60.value}' },
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
    backgroundColor: { value: '{colors.background.primary.value}' },
    borderColor: { value: '{colors.border.tertiary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
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
    borderRadius: { value: '{radii.xxxl.value}' },
    checked: {
      backgroundColor: { value: '{colors.brand.primary.60.value}' },
    },
    height: { value: '{space.relative.medium.value}' },
    padding: { value: '{outlineWidths.medium.value}' },
    transition: {
      duration: { value: '{time.short.value}' },
    },
    width: { value: '{space.relative.xl.value}' },
  },
};
