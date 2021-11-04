module.exports = {
  display: { value: 'block' },
  backgroundColor: { value: '{colors.white.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  boxShadow: {
    value: {
      offsetX: '0',
      offsetY: '1px',
      blurRadius: '10px',
      color: '{colors.overlay.30.value}',
    },
  },
  width: { value: '100%' },
  item: {
    marginTop: { value: '1px' },
    boxShadow: {
      value: {
        offsetX: '0',
        offsetY: '1px',
        blurRadius: '0',
        color: '{colors.overlay.20.value}',
      },
    },
    borderStartStartRadius: { value: '0.5rem' },
    borderStartEndRadius: { value: '0.5rem' },
    borderEndStartRadius: { value: '0.5rem' },
    borderEndEndRadius: { value: '0.5rem' },
    _focus: {
      boxShadow: {
        value: {
          offsetX: '0',
          offsetY: '0',
          blurRadius: '0',
          spreadRadius: '2px',
          color: '{colors.border.focus.value}',
        },
      },
    },
  },
  trigger: {
    height: { value: '3rem' },
    paddingInlineStart: { value: '1.5rem' },
    paddingInlineEnd: { value: '1.5rem' },
    alignItems: { value: 'center' },
    justifyContent: { value: 'space-between' },
    boxShadow: {
      value: {
        offsetX: '0',
        offsetY: '1px',
        blurRadius: '0',
        color: '{colors.overlay.20.value}',
      },
    },
    _hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
    },
  },
  content: {
    paddingInlineStart: { value: '1.25rem' },
    paddingInlineEnd: { value: '1.25rem' },
    text: {
      color: { value: '{colors.font.secondary.value}' },
      paddingBlockStart: { value: '1rem' },
      paddingBlockEnd: { value: '1rem' },
    },
    _open: {
      animationDuration: { value: '{time.animation.medium.value}' },
    },
    _closed: {
      animationDuration: { value: '{time.animation.medium.value}' },
    },
  },
  icon: {
    transitionDuration: { value: '{time.transition.medium.value}' },
  },
};
