module.exports = {
  // Color property not getting applied, issue with build order (Text built after Heading, alphabetically). Will solve later using SCSS.
  'color': { 'value': '{colors.font.primary.value}' },
  'line-height': { 'value': 1.25 },

  '1': {
    'font-size': { 'value': '{fontSizes.4xl.value}' },
    'font-weight': { 'value': '{fontWeights.light.value}' },
  },
  '2': {
    'font-size': { 'value': '{fontSizes.3xl.value}' },
    'font-weight': { 'value': '{fontWeights.light.value}' },
  },
  '3': {
    'font-size': { 'value': '{fontSizes.2xl.value}' },
    'font-weight': { 'value': '{fontWeights.normal.value}' },
  },
  '4': {
    'font-size': { 'value': '{fontSizes.xl.value}' },
    'font-weight': { 'value': '{fontWeights.medium.value}' },
  },
  '5': {
    'font-size': { 'value': '{fontSizes.large.value}' },
    'font-weight': { 'value': '{fontWeights.semibold.value}' },
  },
  '6': {
    'font-size': { 'value': '{fontSizes.medium.value}' },
    'font-weight': { 'value': '{fontWeights.bold.value}' },
  },
};
