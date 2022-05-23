// as a safeguard against known React Native lineHeight issues, e.g. https://github.com/facebook/react-native/issues/29507
// use a value of 1.5 as the default line height multiplier
var LINE_HEIGHT_MULTIPLIER = 1.5;
export var getLineHeight = function (fontSize) {
  return fontSize * LINE_HEIGHT_MULTIPLIER;
};
