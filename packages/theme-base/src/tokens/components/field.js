module.exports = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  boxSizing: { value: 'border-box' },
  padding: { value: ['{space.xs.value}', '{space.medium.value}'] },
  fontSize: { value: '{fontSizes.medium.value}' },
  lineHeight: { value: '{lineHeights.medium.value}' },
  outlineColor: { value: '{colors.transparent.value}' },
  outlineStyle: { value: 'solid' },
  outlineWidth: { value: '{outlineWidths.medium.value}' },
  outlineOffset: { value: '{outlineOffsets.medium.value}' },

  small: {
    fontSize: { value: '{fontSizes.small.value}' },
    padding: { value: ['{space.xs.value}', '{space.small.value}'] },
    lineHeight: { value: '{lineHeights.small.value}' },
  },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
    padding: { value: ['{space.medium.value}', '{space.large.value}'] },
    lineHeight: { value: '{lineHeights.large.value}' },
  },

  _focus: {
    borderColor: { value: 'hsl(220, 50%, 50%)' },
    boxShadow: { value: '0 0 1px 2px hsl(220, 50%, 50%)' },
  },
  _disabled: {
    cursor: { value: 'not-allowed' },
    borderColor: { value: '{colors.transparent.value}' },
    backgroundColor: { value: '{colors.background.tertiary.value}' },
  },
};
