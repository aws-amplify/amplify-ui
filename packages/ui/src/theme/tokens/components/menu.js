module.exports = {
  backgroundColor: { value: '{colors.white.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  boxShadow: { value: '{shadows.large.value}' },
  flexDirection: { value: 'column' },
  gap: { value: 0 },
  maxWidth: { value: '30rem' },
  minWidth: { value: '14rem' },

  small: {
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
  },
  large: {
    width: { value: '{fontSizes.xxxl.value}' },
    height: { value: '{fontSizes.xxxl.value}' },
  },
  item: {
    minHeight: { value: '2.5rem' },
    paddingInlineStart: { value: '{space.medium.value}' },
    paddingInlineEnd: { value: '{space.medium.value}' },
  },
};
