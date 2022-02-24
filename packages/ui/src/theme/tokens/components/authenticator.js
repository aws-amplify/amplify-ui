module.exports = {
  modal: {
    width: { value: '100%' },
    height: { value: '100%' },
    backgroundColor: { value: '{colors.background.secondary.value}' },
    position: { value: 'fixed' },
    top: { value: '{space.zero}' },
    left: { value: '{space.zero}' },
  },
  container: {
    placeSelf: { value: 'center' },
    widthDesktop: { value: '70%' },
    widthHandheld: { value: '{space.relative.full}' },
    widthMax: { value: '30rem' },
  },
  router: {
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    borderColor: { value: '{colors.border.primary.value}' },
  },
};
