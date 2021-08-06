module.exports = {
  current: {
    color: { value: '{colors.white.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: 'rgba(0, 0, 0, 0.4)' },
  },
  button: {
    color: { value: 'inherit' },
    fontWeight: { value: 'inherit' },
    paddingTop: { value: '0' },
    paddingRight: { value: '{space.xs.value}' },
    paddingBottom: { value: '0' },
    paddingLeft: { value: '{space.xs.value}' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    hover: {
      backgroundColor: { value: 'rgba(0, 0, 0, 0.1)' },
    },
    disabled: {
      opacity: { value: '{opacities.40.value}' },
    },
  },
  ellipsis: {
    paddingRight: { value: '{space.xs.value}' },
    paddingLeft: { value: '{space.xs.value}' },
  },
  itemContainer: {
    marginLeft: { value: '4px' },
    marginRight: { value: '4px' },
  },
  itemShared: {
    height: { value: '{fontSizes.xxl.value}' },
    minWidth: { value: '{fontSizes.xxl.value}' },
    borderRadius: { value: '{fontSizes.medium.value}' },
  },
};
