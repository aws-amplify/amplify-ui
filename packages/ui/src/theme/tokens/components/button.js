module.exports = {
  // shared styles
  fontWeight: { value: 'bold' },
  textAlign: { value: 'center' },
  borderRadius: { value: '{components.field.borderRadius.value}' },
  transitionDuration: { value: '{components.field.transitionDuration.value}' },
  fontSize: { value: '{components.field.fontSize.value}' },
  lineHeight: { value: '{components.field.fontSize.value}' },
  padding: { value: ['{space.small.value}', '{space.medium.value}'] },
  borderColor: { value: '{colors.brand.primary.20.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  color: { value: '{colors.brand.primary.80.value}' },

  _hover: {
    color: { value: '{colors.focus.value}' },
    backgroundColor: { value: '{colors.brand.primary.10.value}' },
    borderColor: { value: '{colors.brand.primary.60.value}' },
  },
  _focus: {
    color: { value: '{colors.focus.value}' },
    borderColor: { value: '{colors.focus.value}' },
    boxShadow: { value: '{colors.focus.value} 0px 0px 0px 1px' },
  },
  _active: {
    color: { value: '{colors.font.inverse.value}' },
    backgroundColor: { value: '{colors.brand.primary.100.value}' },
    borderColor: { value: '{colors.brand.primary.100.value}' },
  },
  _loading: {
    color: { value: '{colors.font.tertiary.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },
  _disabled: {
    color: { value: '{colors.font.tertiary.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },

  // variations
  primary: {
    borderWidth: { value: 0 },
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
    color: { value: '{colors.font.inverse.value}' },
    _disabled: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
      color: { value: '{colors.font.tertiary.value}' },
    },
    _loading: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
      color: { value: '{colors.font.tertiary.value}' },
    },
    _hover: {
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
    },
    _focus: {
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
    },
    _active: {
      backgroundColor: { value: '{colors.brand.primary.100.value}' },
    },
  },

  link: {
    borderWidth: { value: 0 },
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.interactive.value}' },
    _hover: {
      color: { value: '{colors.font.hover.value}' },
    },
    _focus: {
      color: { value: '{colors.font.focus.value}' },
    },
    _active: {
      color: { value: '{colors.font.active.value}' },
    },
    _disabled: {
      color: { value: '{colors.font.tertiary.value}' },
    },
    _loading: {
      color: { value: '{colors.font.tertiary.value}' },
    },
  },

  // sizes
  small: {
    fontSize: { value: '{components.field.small.fontSize.value}' },
    lineHeight: { value: '{components.field.small.fontSize.value}' },
    padding: { value: '{components.field.small.padding.value}' },
  },
  large: {
    fontSize: { value: '{components.field.large.fontSize.value}' },
    lineHeight: { value: '{components.field.large.fontSize.value}' },
    padding: { value: '{components.field.large.padding.value}' },
  },
};
