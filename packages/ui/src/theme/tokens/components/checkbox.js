module.exports = {
  cursor: { value: 'pointer' },
  alignItems: { value: 'center' },
  justifyContent: { value: 'center' },
  disabled: {
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
      content: { value: '""' },
      display: { value: 'inline-block' },
      position: { value: 'absolute' },
      width: { value: '100%' },
      height: { value: '100%' },
      boxSizing: { value: 'border-box' },
      borderWidth: { value: '{borderWidths.medium.value}' },
      borderRadius: { value: '20%' },
      borderStyle: { value: 'solid' },
      borderColor: { value: '{colors.border.primary.value}' },
      disabled: {
        borderColor: { value: '{colors.neutral.20.value}' },
      },
    },
    focus: {
      outlineColor: { value: '{colors.transparent.value}' },
      outlineStyle: { value: 'solid' },
      outlineWidth: { value: '{outlineWidths.medium.value}' },
      outlineOffset: { value: '{outlineOffsets.medium.value}' },
      borderColor: { value: '{colors.transparent.value}' },
      boxShadow: { value: '0 0 0 3px {colors.focus.value}' },
    },
  },
  icon: {
    transform: { value: 'scale(0)' },
    borderRadius: { value: '20%' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    transitionTimingFunction: { value: 'ease-in-out' },
    checked: {
      backgroundColor: { value: '{colors.neutral.60.value}' },
      transform: { value: 'scale(1)' },
      emphasized: {
        backgroundColor: { value: '{colors.blue.40.value}' },
      },
      disabled: {
        backgroundColor: { value: '{colors.neutral.20.value}' },
      },
    },
  },
  label: {
    disabled: {
      color: { value: '{colors.neutral.40.value}' },
    },
  },
};
