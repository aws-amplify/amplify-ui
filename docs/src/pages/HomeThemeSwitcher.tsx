import { Card, Heading, View, Flex } from '@aws-amplify/ui-react';
import { theme } from './theme';

const { tokens } = theme;

const artisticTheme = theme.overrides.find(
  (override) => override.selector && override.selector.includes('artistic')
);
console.log(artisticTheme);

const Swatch = ({ color }) => (
  <View
    borderRadius="5rem"
    width="2rem"
    height="2rem"
    style={{ marginInlineStart: '-0.5rem' }}
    backgroundColor={color}
  />
);

export const HomeThemeSwitcher = ({ themeOverride, setThemeOverride }) => {
  return (
    <Flex direction="row">
      <Card className={`theme-card ${themeOverride}`}>
        <Heading level={5}>Default</Heading>
        <Flex direction="row">
          <Swatch color={artisticTheme.tokens.colors.brand.primary[80].value} />
          <Swatch
            color={artisticTheme.tokens.colors.brand.secondary[80].value}
          />
        </Flex>
      </Card>
    </Flex>
  );
};
