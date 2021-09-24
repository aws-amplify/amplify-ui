module.exports = {
  borderColor: { value: '{colors.border.tertiary.value}' },
  color: { value: 'rgba(0, 0, 0, 0.54)' },
  _hover: {
    backgroundColor: { value: 'rgba(0, 0, 0, 0.04)' },
  },
  _focus: {
    borderColor: { value: '{colors.focus.value}' },
    color: { value: 'rgba(0, 0, 0, 0.54)' },
  },
  _active: {
    backgroundColor: { value: '{colors.transparent.value}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderColor: { value: '{colors.border.tertiary.value}' },
    color: { value: '{colors.font.disabled.value}' },
  },
  pressed: {
    color: { value: 'rgba(0, 0, 0, 0.87)' },
    backgroundColor: { value: 'rgba(0, 0, 0, 0.08)' },
    _hover: {
      backgroundColor: { value: 'rgba(0, 0, 0, 0.12)' },
    },
  },
  primary: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    _focus: {
      borderColor: { value: '{colors.focus.value}' },
      backgroundColor: { value: '{colors.transparent.value}' },
      boxShadow: { value: '0 0 0 1px {colors.focus.value}' },
      color: { value: 'rgba(0, 0, 0, 0.54)' },
    },
    _hover: {
      backgroundColor: { value: 'rgba(0, 0, 0, 0.04)' },
      color: { value: 'rgba(0, 0, 0, 0.54)' },
    },
    _disabled: {
      backgroundColor: { value: '{colors.background.tertiary.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    pressed: {
      backgroundColor: { value: 'rgba(0, 128, 128, 0.08)' },
      color: { value: 'rgba(0, 128, 128, 0.87)' },
      _hover: {
        backgroundColor: {
          value: 'rgba(0, 128, 128, 0.12)',
        },
      },
    },
  },
  link: {
    color: { value: 'rgba(0, 0, 0, 0.54)' },
    _hover: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: 'rgba(0, 0, 0, 0.54)' },
    },
    _focus: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: 'rgba(0, 0, 0, 0.54)' },
    },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
    pressed: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: 'rgba(0, 0, 0, 0.87)' },
      _hover: {
        backgroundColor: { value: '{colors.transparent.value}' },
      },
    },
  },
};
