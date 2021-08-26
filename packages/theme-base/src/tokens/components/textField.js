module.exports = {
  // default styles
  fontSize: { value: '{components.field.fontSize.value}' },
  gap: { value: '{space.xs.value}' },

  // Adjust base fontSize and gap for small and large sizes
  small: {
    gap: { value: '{space.xxs.value}' },
    fontSize: { value: '{components.field.small.fontSize.value}' },
  },
  large: {
    gap: { value: '{space.small.value}' },
    fontSize: { value: '{components.field.large.fontSize.value}' },
  },
};
