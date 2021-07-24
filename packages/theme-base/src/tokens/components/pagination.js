module.exports = {
  display: { value: 'flex' },
  listStyleType: { value: 'none' },
  itemContainer: {
    display: { value: 'flex' },
    height: { value: '{fontSizes.xxl.value}' },
    minWidth: { value: '{fontSizes.xxl.value}' },
    marginTop: { value: '0' },
    marginRight: { value: '4px' },
    marginBottom: { value: '0' },
    marginLeft: { value: '4px' },
    paddingTop: { value: '0' },
    paddingRight: { value: '6px' },
    paddingBottom: { value: '0' },
    paddingLeft: { value: '6px' },
    borderRadius: { value: '{radii.large.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    boxSizing: { value: 'border-box' },
    transition: {
      value: 'background-color {time.transition.medium.value}',
    },
    hover: {
      backgroundColor: { value: 'rgba(0, 0, 0, 0.04)' },
    },
    current: {
      backgroundColor: { value: 'rgba(0, 0, 0, 0.08)' },
    },
    disabled: {
      opacity: { value: '{opacities.40.value}' },
      cursor: { value: 'default' },
      pointerEvents: { value: 'none' },
    },
    ellipsis: {
      backgroundColor: { value: 'inherit' },
    },
  },
  item: {
    display: { value: 'flex' },
    color: { value: 'inherit' },
    width: { value: '{fontSizes.large.value}' },
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    hover: {
      textDecoration: { value: 'none' },
    },
  },
};
