module.exports = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  padding: { value: ['{space.xs.value}', '{space.medium.value}'] },
  fontSize: { value: '{components.field.fontSize.value}' },
  lineHeight: { value: '{lineHeights.medium.value}' },
  transitionDuration: { value: '{time.transition.medium.value}' },
  outlineColor: { value: '{colors.transparent.value}' },
  outlineStyle: { value: 'solid' },
  outlineWidth: { value: '{outlineWidths.medium.value}' },
  outlineOffset: { value: '{outlineOffsets.medium.value}' },

  small: {
    fontSize: { value: '{components.field.small.fontSize.value}' },
    padding: { value: ['{space.xs.value}', '{space.small.value}'] },
    lineHeight: { value: '{lineHeights.small.value}' },
  },
  large: {
    fontSize: { value: '{components.field.large.fontSize.value}' },
    padding: { value: ['{space.medium.value}', '{space.large.value}'] },
    lineHeight: { value: '{lineHeights.large.value}' },
  },

  quiet: {
    borderStyle: { value: 'none' },
    borderBlockEnd: {
      value: '{borderWidths.small.value} solid {colors.border.primary.value}',
    },
    borderInlineStart: { value: 'none' },
    borderInlineEnd: { value: 'none' },
    borderBlockStart: { value: 'none' },
    borderRadius: { value: '0' },
    _focus: {
      borderBlockEndColor: { value: '{colors.focus.value}' },
      boxShadow: { value: '0 1px {colors.focus.value}' },
    },
    _error: {
      borderBlockEndColor: { value: '{colors.error.value}' },
      _focus: {
        boxShadow: { value: '0 1px {colors.error.value}' },
      },
    },
  },
  _focus: {
    // These focus styles have been calibrated to create
    // a highly visible focus indicator per WCAG 2.1 guidliness:
    // See: https://www.w3.org/WAI/WCAG21/Techniques/general/G195.html
    //
    // Key features:
    // * Focus indicator area is at least the 1 CSS px border around the component.
    // * Contrast between focused and unfocused states has a ratio of 3:1
    //
    // IMPORTANT: Must recalibrate if `colors.border.primary` or `colors.focus` are changed
    borderColor: { value: '{colors.focus.value}' },
    boxShadow: { value: '0px 0px 0px 1px {colors.focus.value}' },
  },
  _disabled: {
    cursor: { value: 'not-allowed' },
    borderColor: { value: '{colors.transparent.value}' },
    backgroundColor: { value: '{colors.background.tertiary.value}' },
  },
  _error: {
    borderColor: { value: '{colors.error.value}' },
    _focus: {
      boxShadow: { value: '0px 0px 0px 1px {colors.error.value}' },
    },
  },
};
