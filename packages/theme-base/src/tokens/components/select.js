module.exports = {
  width: { value: '100%' },
  paddingInlineEnd: { value: '{space.xxl.value}' },
  transitionProperty: { value: 'background-color' },
  transitionDuration: { value: '{time.transition.medium.value}' },
  // wrappers
  wrapper: {
    display: { value: 'block' },
    position: { value: 'relative' },
    cursor: { value: 'pointer' },
  },
  iconWrapper: {
    position: { value: 'absolute' },
    height: { value: '50%' },
    top: { value: '25%' },
    right: { value: '{space.medium.value}' },
    pointerEvents: { value: 'none' },
  },
};
