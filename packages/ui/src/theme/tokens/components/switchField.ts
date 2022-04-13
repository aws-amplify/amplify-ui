export const switchfield = {
  // Child elements
  label: {
    padding: { value: '{space.xs.value}' },
  },

  thumb: {
    backgroundColor: { value: '{colors.background.primary.value}' },
    borderColor: { value: '{colors.border.tertiary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
    transition: {
      duration: { value: '{time.medium.value}' },
    },
    width: { value: '{space.relative.medium.value}' },
  },

  track: {
    backgroundColor: { value: '{colors.background.tertiary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
    height: { value: '{space.relative.medium.value}' },
    padding: { value: '{outlineWidths.medium.value}' },
    transition: {
      duration: { value: '{time.short.value}' },
    },
    width: { value: '{space.relative.xl.value}' },
  },

  // States
  _disabled: {
    opacity: { value: '{opacities.60.value}' },
  },
  _focus: {
    track: {
      shadow: {
        value: {
          offsetX: '0px',
          offsetY: '0px',
          blurRadius: '0px',
          spreadRadius: '2px',
          color: '{colors.border.focus.value}',
        },
      },
    },
  },
  _checked: {
    thumb: {
      transform: { value: '{transforms.slideX.medium.value}' },
    },
    track: {
      backgroundColor: { value: '{colors.brand.primary.60.value}' },
    },
  },

  // Sizes
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
  },
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
  },
};
