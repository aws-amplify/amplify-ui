module.exports = {
  // shared styles
  fontWeight: { value: 'bold' },
  borderRadius: { value: '{components.fieldcontrol.borderRadius.value}' },
  transitionDuration: {
    value: '{components.fieldcontrol.transitionDuration.value}',
  },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  lineHeight: { value: '{components.fieldcontrol.lineHeight.value}' },
  paddingBlockStart: {
    value: '{components.fieldcontrol.paddingBlockStart.value}',
  },
  paddingBlockEnd: {
    value: '{components.fieldcontrol.paddingBlockEnd.value}',
  },
  paddingInlineStart: {
    value: '{components.fieldcontrol.paddingInlineStart.value}',
  },
  paddingInlineEnd: {
    value: '{components.fieldcontrol.paddingInlineEnd.value}',
  },
  borderColor: { value: '{colors.brand.primary.20.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  color: { value: '{colors.brand.primary.80.value}' },

  _hover: {
    color: { value: '{colors.font.focus.value}' },
    backgroundColor: { value: '{colors.brand.primary.10.value}' },
    borderColor: { value: '{colors.brand.primary.60.value}' },
  },
  _focus: {
    color: { value: '{colors.font.focus.value}' },
    borderColor: { value: '{colors.border.focus.value}' },
    boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
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
    color: { value: '{colors.font.disabled.value}' },
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

  menu: {
    borderWidth: { value: 0 },
    backgroundColor: { value: 'none' },
    justifyContent: { value: 'start' },
    // Focus and hover styles are identical for menu variation
    // because for Menu primitive, menu items are forced to be focused even
    // for mouse interactions, making it impossible to distinguish the two interactions
    _hover: {
      color: { value: '{colors.white.value}' },
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
    },
    _focus: {
      color: { value: '{colors.white.value}' },
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
    },
    _active: {
      color: { value: '{colors.white.value}' },
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
    },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
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
      color: { value: '{colors.font.disabled.value}' },
    },
    _loading: {
      color: { value: '{colors.font.tertiary.value}' },
    },
  },

  // sizes
  small: {
    fontSize: { value: '{components.fieldcontrol.small.fontSize.value}' },
    paddingBlockStart: {
      value: '{components.fieldcontrol.small.paddingBlockStart.value}',
    },
    paddingBlockEnd: {
      value: '{components.fieldcontrol.small.paddingBlockEnd.value}',
    },
    paddingInlineStart: {
      value: '{components.fieldcontrol.small.paddingInlineStart.value}',
    },
    paddingInlineEnd: {
      value: '{components.fieldcontrol.small.paddingInlineEnd.value}',
    },
  },
  large: {
    fontSize: { value: '{components.fieldcontrol.large.fontSize.value}' },
    paddingBlockStart: {
      value: '{components.fieldcontrol.large.paddingBlockStart.value}',
    },
    paddingBlockEnd: {
      value: '{components.fieldcontrol.large.paddingBlockEnd.value}',
    },
    paddingInlineStart: {
      value: '{components.fieldcontrol.large.paddingInlineStart.value}',
    },
    paddingInlineEnd: {
      value: '{components.fieldcontrol.large.paddingInlineEnd.value}',
    },
  },
};
