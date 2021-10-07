module.exports = {
  current: {
    color: { value: '{colors.white.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.black.opacity.40.value}' },
  },
  button: {
    color: { value: '{colors.black.value}' },
    paddingRight: { value: '{space.xxs.value}' },
    paddingLeft: { value: '{space.xxs.value}' },
    transitionProperty: { value: 'background-color' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    hover: {
      backgroundColor: { value: '{colors.black.opacity.10.value}' },
      color: { value: '{colors.black.value}' },
    },
    disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },
  ellipsis: {
    paddingRight: { value: '{space.xs.value}' },
    paddingLeft: { value: '{space.xs.value}' },
  },
  itemContainer: {
    marginLeft: { value: '{space.xxxs.value}' },
    marginRight: { value: '{space.xxxs.value}' },
  },
  itemShared: {
    height: { value: '{fontSizes.xxl.value}' },
    minWidth: { value: '{fontSizes.xxl.value}' },
    borderRadius: { value: '{fontSizes.medium.value}' },
  },
};
