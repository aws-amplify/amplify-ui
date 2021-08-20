module.exports = {
  // default styles
  gap: { value: '{space.xs.value}' },
  fontSize: { value: '{components.field.fontSize.value}' },
  padding: { value: '{components.field.padding.value}' },

  small: {
    gap: { value: '{space.xxs.value}' },
    fontSize: { value: '{components.field.small.fontSize.value}' },
    padding: { value: '{components.field.small.padding.value}' },
  },
  large: {
    gap: { value: '{space.small.value}' },
    fontSize: { value: '{components.field.large.fontSize.value}' },
    padding: { value: '{components.field.large.padding.value}' },
  },
  disabled: {
    backgroundColor: {
      value: '{components.field._disabled.backgroundColor.value}',
    },
  },
};
