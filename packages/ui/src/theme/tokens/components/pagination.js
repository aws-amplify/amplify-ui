module.exports = {
  current: {
    color: { value: '{colors.white.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.black.opacity.40.value}' },
  },
  button: {
    color: { value: 'inherit' },
    fontWeight: { value: 'inherit' },
    paddingTop: { value: '0' },
    paddingRight: { value: '6px' },
    paddingBottom: { value: '0' },
    paddingLeft: { value: '6px' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    hover: {
      backgroundColor: { value: '{colors.black.opacity.10.value}' },
    },
    disabled: {
      opacity: { value: '{opacities.40.value}' },
    },
  },
  ellipsis: {
    paddingRight: { value: '8px' },
    paddingLeft: { value: '8px' },
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
