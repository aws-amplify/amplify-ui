// as a safeguard against known React Native lineHeight issues, e.g. https://github.com/facebook/react-native/issues/29507
// use a value of 1.5 as the default line height multiplier
const LINE_HEIGHT_MULTIPLIER = 1.5;

export const getLineHeight = (fontSize: number): number =>
  fontSize * LINE_HEIGHT_MULTIPLIER;
