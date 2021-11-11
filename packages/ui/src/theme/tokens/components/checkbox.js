module.exports = {
  cursor: { value: 'pointer' },
  alignItems: { value: 'center' },
  _disabled: {
    cursor: {
      value: 'not-allowed',
    },
  },
  button: {
    position: { value: 'relative' },
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    color: { value: '{colors.white.value}' },
    before: {
      width: { value: '100%' },
      height: { value: '100%' },
      borderWidth: { value: '{borderWidths.medium.value}' },
      borderRadius: { value: '20%' },
      borderStyle: { value: 'solid' },
      borderColor: { value: '{colors.border.primary.value}' },
    },
    _focus: {
      outlineColor: { value: '{colors.transparent.value}' },
      outlineStyle: { value: 'solid' },
      outlineWidth: { value: '{outlineWidths.medium.value}' },
      outlineOffset: { value: '{outlineOffsets.medium.value}' },
      borderColor: { value: '{colors.transparent.value}' },
      boxShadow: {
        value: {
          offsetX: '0px',
          offsetY: '0px',
          blurRadius: '0px',
          spreadRadius: '2px',
          color: '{colors.border.focus.value}',
        },
      },
    },
    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
    },
    _error: {
      borderColor: { value: '{colors.border.error.value}' },
      _focus: {
        borderColor: { value: '{colors.transparent.value}' },
        boxShadow: {
          value: {
            offsetX: '0px',
            offsetY: '0px',
            blurRadius: '0px',
            spreadRadius: '2px',
            color: '{colors.border.error.value}',
          },
        },
      },
    },
  },
  icon: {
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
    borderRadius: { value: '20%' },
    opacity: { value: '{opacities.0.value}' },
    transform: { value: 'scale(0)' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.short.value}' },
    transitionTimingFunction: { value: 'ease-in-out' },
    _checked: {
      opacity: { value: '{opacities.100.value}' },
      transform: { value: 'scale(1)' },
      _disabled: {
        backgroundColor: { value: '{colors.background.disabled.value}' },
      },
    },
  },
  label: {
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },
};
