module.exports = {
  current: {
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    color: { value: '{colors.white.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.overlay.40.value}' },
  },
  button: {
    color: { value: '{colors.font.primary.value}' },
    paddingInlineStart: { value: '{space.xxs.value}' },
    paddingInlineEnd: { value: '{space.xxs.value}' },
    transitionProperty: { value: 'background-color' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
      color: { value: '{colors.font.primary.value}' },
    },
    disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },
  ellipsis: {
    alignItems: { value: 'baseline' },
    justifyContent: { value: 'center' },
    paddingInlineStart: { value: '{space.xs.value}' },
    paddingInlineEnd: { value: '{space.xs.value}' },
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
