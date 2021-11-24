module.exports = {
  alignItems: { value: 'center' },
  justifyContent: { value: 'flex-start' },
  gap: { value: 'inherit' },
  _disabled: { cursor: { value: 'not-allowed' } },
  button: {
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
    boxSizing: { value: 'border-box' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '50%' },
    borderColor: { value: '{colors.border.primary.value}' },
    color: { value: '{colors.white.value}' },
    backgroundColor: { value: '{colors.white.value}' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.medium.value}' },
    outlineColor: { value: '{colors.transparent.value}' },
    outlineStyle: { value: 'solid' },
    outlineWidth: { value: '{outlineWidths.medium.value}' },
    outlineOffset: { value: '{outlineOffsets.medium.value}' },
    // We want the dot inside the border to be a border-width from the border
    padding: { value: '{borderWidths.medium.value}' },

    small: {
      width: { value: '{fontSizes.small.value}' },
      height: { value: '{fontSizes.small.value}' },
    },
    large: {
      width: { value: '{fontSizes.large.value}' },
      height: { value: '{fontSizes.large.value}' },
    },

    _checked: {
      color: {
        value: '{colors.brand.primary.80.value}',
      },
      _disabled: { color: { value: '{colors.background.disabled.value}' } },
    },

    _focus: {
      borderColor: { value: '{colors.border.focus.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
    },

    _error: {
      borderColor: { value: '{colors.border.error.value}' },
      _focus: {
        boxShadow: {
          value: '{components.fieldcontrol._error._focus.boxShadow.value}',
        },
      },
    },

    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
    },
  },

  label: {
    _disabled: {
      color: {
        value: '{colors.font.disabled.value}',
      },
    },
  },
};
