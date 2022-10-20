import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Card,
  Badge,
  Button,
  Flex,
  ToggleButton,
  ToggleButtonGroup,
  Text,
  ThemeProvider,
  Grid,
  View,
  SwitchField,
  SliderField,
  TabItem,
  Tabs,
  Alert,
  Loader,
  Icon,
  CheckboxField,
  RadioGroupField,
  Radio,
  SearchField,
  useBreakpointValue,
  Image,
  Authenticator,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

import { CgTerminal, CgLinear, CgCopyright } from 'react-icons/cg';

import themePreval from './themes/index.preval';
import { HomeCode } from '@/components/home/HomeCode';
import { CodeHighlight } from '@/components/CodeHighlight';
import { trackClick } from '@/utils/track';

const colorKeys = [10, 20, 40, 60, 80, 90, 100];
const scale = ['primary', 'secondary', 'tertiary', 'success', 'info', 'error'];

const Swatch = ({ color }) => (
  <View height="2rem" flex="1" backgroundColor={color} borderRadius="medium" />
);

const Preview = ({ platform }) => {
  const [exclusiveValue, setExclusiveValue] = useState('align-left');

  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });

  if (platform !== 'react') {
    return (
      <Authenticator
        socialProviders={['amazon', 'apple', 'facebook', 'google']}
      />
    );
  }

  return (
    <Grid
      columnGap="small"
      rowGap="small"
      templateColumns={isMobile ? '1fr' : '1fr 1fr 1fr 1fr'}
    >
      <Card variation="elevated" columnStart="1" columnEnd="4">
        <Flex direction="column">
          <Alert variation="info" heading="Flash sale!" />
          <Flex direction={isMobile ? 'column' : 'row'}>
            <Image alt="" src="/amplify-placeholder.svg" width="100px" />
            <Flex direction="column">
              <ToggleButtonGroup
                value={exclusiveValue}
                size="small"
                isExclusive
                onChange={(value: string) => setExclusiveValue(value)}
              >
                <ToggleButton value="align-left" ariaLabel="align left">
                  Sm
                </ToggleButton>
                <ToggleButton value="align-center" ariaLabel="align center">
                  Md
                </ToggleButton>
                <ToggleButton value="align-right" ariaLabel="align right">
                  Lg
                </ToggleButton>
                <ToggleButton value="align-justify" ariaLabel="align justify">
                  XL
                </ToggleButton>
              </ToggleButtonGroup>
              <Flex direction="row" alignItems="center">
                <Text as="span" fontSize="xl">
                  $29.99
                </Text>
                <Text as="span" color="font.success">
                  20% off
                </Text>
              </Flex>
              <Button variation="primary">Add to cart</Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {isMobile ? null : (
        <>
          <Card variation="elevated" columnStart="4" columnEnd="-1">
            <Flex direction="column">
              <CheckboxField
                label="Sprinkles"
                value="Sprinkles"
                name="topping"
                defaultChecked
              />
              <CheckboxField label="Frosting" value="Frosting" name="topping" />
              <RadioGroupField
                label="Language"
                name="theme-language"
                defaultValue="css"
                gap="small"
                labelHidden
              >
                <Radio value="html">HTML</Radio>
                <Radio value="css">CSS</Radio>
                <Radio value="javascript">Javascript</Radio>
              </RadioGroupField>
            </Flex>
          </Card>
          <Card variation="elevated" columnStart="1" columnEnd="3">
            <Flex direction="column">
              <SliderField
                label="Slider"
                min={0}
                max={100}
                step={1}
                defaultValue={50}
              />
              <Loader variation="linear" />
              <SearchField placeholder="Search" label="Search" />
            </Flex>
          </Card>
          <Card variation="elevated" columnStart="3" columnEnd="-1">
            <Flex direction="column">
              <Flex direction="row" gap="xs">
                {scale.map((level) => (
                  <Text key={level} fontSize="xl" color={`font.${level}`}>
                    Aa
                  </Text>
                ))}
              </Flex>
              <Flex direction="row" gap="xs">
                {colorKeys.map((key) => (
                  <Swatch key={key} color={`brand.primary.${key}`} />
                ))}
              </Flex>
              <Flex direction="row" gap="xs">
                {colorKeys.map((key) => (
                  <Swatch key={key} color={`brand.secondary.${key}`} />
                ))}
              </Flex>
            </Flex>
          </Card>
          <Card variation="elevated" columnStart="1" columnEnd="2">
            <Flex
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <SwitchField label="switch" labelPosition="end" />
            </Flex>
          </Card>
          <Card variation="elevated" columnStart="2" columnEnd="-1">
            <Tabs>
              <TabItem title="Amplify"></TabItem>

              <TabItem
                title={
                  <View>
                    Studio{' '}
                    <Badge size="small" variation="success">
                      new
                    </Badge>
                  </View>
                }
              ></TabItem>
            </Tabs>
          </Card>
        </>
      )}
    </Grid>
  );
};

const language = {
  react: 'javascript',
  angular: 'css',
  vue: 'css',
};

const fileName = {
  react: 'theme.ts',
  angular: 'styles.css',
  vue: 'styles.css',
};

export const ThemeSwitcher = ({ colorMode }) => {
  const [theme, setTheme] = useState('default');
  const {
    query: { platform = 'react' },
  } = useRouter();

  const isMobile = useBreakpointValue({
    base: true,
    large: false,
  });

  return (
    <Flex
      direction="column"
      alignItems="center"
      className="docs-home-subsection"
    >
      <ToggleButtonGroup
        value={theme}
        isExclusive
        isSelectionRequired
        onChange={(value) => {
          setTheme(value as string);
          trackClick('HomeThemeSwitch', { value });
        }}
      >
        <ToggleButton value="default" gap="xs">
          <Icon
            ariaLabel={isMobile ? 'Default' : ''}
            paths={[
              {
                d: 'M5.22274 17.8571H11.9827L13.7143 20.9048H13.6655H0L4.8154 12.5604L6.83337 9.06616L8.56591 12.0683L5.22274 17.8571ZM7.74389 7.48595L9.40738 4.60353L18.8218 20.9047H15.4878L7.74389 7.48595ZM10.3333 3H13.6628L24 20.9048H20.6662L10.3333 3Z',
                fillRule: 'evenodd',
              },
            ]}
          />
          {isMobile ? <VisuallyHidden>Default</VisuallyHidden> : 'Default'}
        </ToggleButton>
        <ToggleButton value="terminal" gap="xs">
          <Icon ariaLabel="" as={CgTerminal} />
          {isMobile ? <VisuallyHidden>Terminal</VisuallyHidden> : 'Terminal'}
        </ToggleButton>
        <ToggleButton value="synthwave" gap="xs">
          <Icon ariaLabel="" as={CgLinear} />
          {isMobile ? <VisuallyHidden>Synthwave</VisuallyHidden> : 'Synthwave'}
        </ToggleButton>
        <ToggleButton value="classic" gap="xs">
          <Icon ariaLabel="" as={CgCopyright} />
          {isMobile ? <VisuallyHidden>Classic</VisuallyHidden> : 'Classic'}
        </ToggleButton>
      </ToggleButtonGroup>
      <Flex direction="row" width="100%" gap="xl">
        {isMobile ? null : (
          <HomeCode flex="1" fileName={fileName[platform as string]}>
            <CodeHighlight
              withLines
              className="scrollable"
              code={
                platform === 'react'
                  ? themePreval[theme].string
                  : themePreval[theme].css
              }
              language={language[platform as string]}
            />
          </HomeCode>
        )}
        <View flex="1">
          <ThemeProvider theme={themePreval[theme].code} colorMode={colorMode}>
            <Preview platform={platform} />
          </ThemeProvider>
        </View>
      </Flex>
    </Flex>
  );
};
