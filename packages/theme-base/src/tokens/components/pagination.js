module.exports = {
  current: {
    color: { value: '{colors.white.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: 'rgba(0, 0, 0, 0.4)' },
  },
  button: {
    color: { value: 'inherit' },
    fontWeight: { value: 'inherit' },
    paddingVertical: { value: '0' },
    paddingHorizontal: { value: '{space.xs.value}' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    hover: {
      backgroundColor: { value: 'rgba(0, 0, 0, 0.1)' },
    },
    disabled: {
      opacity: { value: '{opacities.40.value}' },
    },
  },
  ellipsis: {
    paddingHorizontal: { value: '{space.xs.value}' },
  },
  itemContainer: {
    marginHorizontal: { value: '{space.xxs.value}' },
  },
  itemShared: {
    height: { value: '{fontSizes.xxl.value}' },
    minWidth: { value: '{fontSizes.xxl.value}' },
    borderRadius: { value: '{fontSizes.medium.value}' },
  },
};
