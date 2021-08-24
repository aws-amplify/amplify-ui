module.exports = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderRadius: { value: '{radii.medium.value}' },
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
    // These focus styles have been calibrated to create
    // highly visible focus indicator per WCAG 2.1 guidliness:
    // See: https://www.w3.org/WAI/WCAG21/Techniques/general/G195.html
    // * Focus indicator area is at least the 1 CSS px border around the component.
    // * contrast of the indicator between focused and unfocused states has a ratio of 3:1 for the minimum focus indicator area.

    borderColor: { value: '{colors.focus.value}' },
    boxShadow: { value: '{colors.focus.value} 0px 0px 0px 1px' },
  },
  _disabled: {
    cursor: { value: 'not-allowed' },
    borderColor: { value: '{colors.transparent.value}' },
    backgroundColor: { value: '{colors.background.tertiary.value}' },
  },
};
