module.exports = {
  // Color property not getting applied, issue with build order (Text built after Heading, alphabetically). Will solve later using SCSS.
  'color': { 'value': '{colors.font.primary.value}' },
  'lineHeight': { 'value': 1.25 },

  '1': {
    'fontSize': { 'value': '{fontSizes.4xl.value}' },
    'fontWeight': { 'value': '{fontWeights.light.value}' },
  },
  '2': {
    'fontSize': { 'value': '{fontSizes.3xl.value}' },
    'fontWeight': { 'value': '{fontWeights.light.value}' },
  },
  '3': {
    'fontSize': { 'value': '{fontSizes.2xl.value}' },
    'fontWeight': { 'value': '{fontWeights.normal.value}' },
  },
  '4': {
    'fontSize': { 'value': '{fontSizes.xl.value}' },
    'fontWeight': { 'value': '{fontWeights.medium.value}' },
  },
  '5': {
    'fontSize': { 'value': '{fontSizes.large.value}' },
    'fontWeight': { 'value': '{fontWeights.semibold.value}' },
  },
  '6': {
    'fontSize': { 'value': '{fontSizes.medium.value}' },
    'fontWeight': { 'value': '{fontWeights.bold.value}' },
  },
};
