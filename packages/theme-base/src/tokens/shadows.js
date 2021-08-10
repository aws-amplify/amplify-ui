module.exports = {
  // TODO: update these to use an object rather than a string for cross-platform
  // transformations
  small: {
    value: {
      // https://github.com/amzn/style-dictionary/issues/678
      offsetX: '0',
      offsetY: '2',
      blurRadius: '4',
      color: '{colors.shadow.tertiary.value}',
      elevation: '1', // Android only
    },
  },
  medium: {
    value: {
      offsetX: '0',
      offsetY: '2',
      blurRadius: '6',
      color: '{colors.shadow.secondary.value}',
      elevation: '2', // Android only
    },
  },
  large: {
    value: {
      offsetX: '0',
      offsetY: '4',
      blurRadius: '12',
      color: '{colors.shadow.primary.value}',
      elevation: '4', // Android only
    },
  },
};
