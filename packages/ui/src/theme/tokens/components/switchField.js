module.exports = {
  disabled: {
    opacity: { value: '{opacities.30.value}' },
  },
  focused: {
    shadow: { value: '{shadows.switch.value}' },
  },
  label: {
    padding: { value: '{space.xxs.value}' },
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
    },
    checked: {
      transform: { value: '{transforms.slideX.medium.value}' },
    },
    transition: {
      duration: { value: '{time.transition.medium.value}' },
    },
    width: { value: '{space.relative.medium.value}' },
  },
  track: {
    background: { value: '{colors.neutral.40.value}' },
    checked: {
      background: { value: '{colors.blue.40.value}' },
    },
    height: { value: '{space.relative.medium.value}' },
    padding: { value: '{outlineWidths.medium.value}' },
    transition: {
      duration: { value: '{time.transition.short.value}' },
    },
    width: { value: '{space.relative.xl.value}' },
  },
};
