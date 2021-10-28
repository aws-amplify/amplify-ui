module.exports = {
  group: {
    gap: { value: '{space.small.value}' },
  },
  root: {
    horizontal: {
      height: { value: '2rem' },
    },
    vertical: {
      width: { value: '2rem' },
    },
  },
  track: {
    backgroundColor: { value: '{colors.background.tertiary.value}' },
    horizontal: {
      height: { value: '0.375rem' },
      minWidth: { value: '10rem' },
    },
    vertical: {
      width: { value: '0.375rem' },
      minHeight: { value: '10rem' },
    },
  },
  range: {
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
  },
  thumb: {
    width: { value: '1.25rem' },
    height: { value: '1.25rem' },
    backgroundColor: { value: '{colors.white.value}' },
    boxShadow: {
      value: {
        offsetX: '0',
        offsetY: '2px',
        blurRadius: '10px',
        color: '{colors.black.value}',
      },
    },
    borderRadius: { value: '50%' },
    _hover: {
      backgroundColor: { value: '{colors.background.secondary.value}' },
    },
    _focus: {
      boxShadow: {
        value: {
          offsetX: '0',
          offsetY: '0',
          blurRadius: '0',
          spreadRadius: '3px',
          color: '{colors.border.focus.value}',
        },
      },
    },
  },
};
