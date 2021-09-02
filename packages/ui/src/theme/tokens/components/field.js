module.exports = {
  // default styles
  gap: { value: '{space.xs.value}' },
  fontSize: { value: '{fontSizes.medium.value}' },

  // Adjust base fontSize and gap for small and large sizes
  small: {
    gap: { value: '{space.xxs.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  large: {
    gap: { value: '{space.small.value}' },
    fontSize: { value: '{fontSizes.large.value}' },
  },
};
