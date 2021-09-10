module.exports = {
  gap: { value: 'inherit' },
  button: {
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
    boxSizing: { value: 'border-box' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '50%' },
    borderColor: { value: '{colors.border.tertiary.value}' },
    color: { value: '{colors.white.value}' },
    backgroundColor: { value: '{colors.white.value}' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.transition.medium.value}' },
    outlineColor: { value: '{colors.transparent.value}' },
    outlineStyle: { value: 'solid' },
    outlineWidth: { value: '{outlineWidths.medium.value}' },
    outlineOffset: { value: '{outlineOffsets.medium.value}' },

    before: {
      content: { value: '""' },
      display: { value: 'inline-block' },
      width: { value: '50%' },
      height: { value: '50%' },
      borderRadius: { value: '50%' },
      backgroundColor: { value: 'currentColor' },
    },

    small: {
      width: { value: '{fontSizes.xs.value}' },
      height: { value: '{fontSizes.xs.value}' },
    },
    large: {
      width: { value: '{fontSizes.large.value}' },
      height: { value: '{fontSizes.large.value}' },
    },

    _checked: {
      borderColor: { value: '#3182ce' },
      backgroundColor: { value: '#3182ce' },
      _hover: {
        borderColor: { value: '#2b6cb0' },
        backgroundColor: { value: '#2b6cb0' },
      },
    },

    _focus: {
      borderColor: { value: '{colors.transparent.value}' },
      boxShadow: { value: '0 0 0 3px rgba(66, 153, 225, 0.6)' },
    },

    _disabled: {
      borderColor: { value: '#e9ecf0' },
      backgroundColor: { value: '{colors.white.value}' },
    },
  },

  label: {
    _disabled: {
      color: {
        value: '#d6dbe2',
      },
    },
  },
};
