module.exports = {
  // default styles
  gap: { value: '{space.xs.value}' },
  fontSize: { value: '{components.fieldControl.fontSize.value}' },

  // Adjust base fontSize and gap for small and large sizes
  small: {
    gap: { value: '{space.xxs.value}' },
    fontSize: { value: '{components.fieldControl.small.fontSize.value}' },
  },
  large: {
    gap: { value: '{space.small.value}' },
    fontSize: { value: '{components.fieldControl.large.fontSize.value}' },
  },
};
