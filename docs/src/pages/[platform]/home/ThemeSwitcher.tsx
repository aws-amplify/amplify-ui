import * as React from 'react';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps } from 'prism-react-renderer';

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
  useTheme,
  Loader,
  Icon,
  CheckboxField,
  RadioGroupField,
  Radio,
  SearchField,
  useBreakpointValue,
  createTheme,
} from '@aws-amplify/ui-react';

import { CgTerminal, CgLinear, CgCopyright } from 'react-icons/cg';

import themePreval from './themes/index.preval';
import { useCustomRouter } from '@/components/useCustomRouter';
import { HomeCode } from './HomeCode';
import { HomeCodeHighlight } from '../../../components/CodeHighlight';

const colorKeys = [10, 20, 40, 60, 80, 90, 100];
const scale = ['primary', 'secondary', 'tertiary', 'success', 'info', 'error'];

const Swatch = ({ color }) => (
  <View
    height="2rem"
    flex="1"
    backgroundColor={color}
    borderRadius="var(--amplify-radii-medium"
  />
);

const Preview = () => {
  const [exclusiveValue, setExclusiveValue] = React.useState('align-left');
  const { tokens } = useTheme();
  const hideOnMobile = useBreakpointValue({
    base: false,
    medium: true,
  });

  const isMobile = useBreakpointValue({
    base: true,
    small: false,
  });

  return (
    <Grid
      columnGap={tokens.space.small}
      rowGap={tokens.space.small}
      templateColumns={hideOnMobile ? '1fr 1fr 1fr 1fr' : '1fr'}
    >
      <Card variation="outlined" columnStart="1" columnEnd="4">
        <Flex direction="column">
          <Alert variation="info" heading="Flash sale!" />
          <Flex direction={isMobile ? 'column' : 'row'}>
            <Flex
              alignItems="center"
              justifyContent="center"
              padding={tokens.space.xl}
              backgroundColor={tokens.colors.background.secondary}
              fontSize={tokens.fontSizes.xxl}
            >
              <Icon
                ariaLabel=""
                paths={[
                  {
                    d: 'M5.22274 17.8571H11.9827L13.7143 20.9048H13.6655H0L4.8154 12.5604L6.83337 9.06616L8.56591 12.0683L5.22274 17.8571ZM7.74389 7.48595L9.40738 4.60353L18.8218 20.9047H15.4878L7.74389 7.48595ZM10.3333 3H13.6628L24 20.9048H20.6662L10.3333 3Z',
                    fillRule: 'evenodd',
                  },
                ]}
              />
            </Flex>
            <Flex direction="column">
              <Text>Hi quality Amplify</Text>
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
                <Text as="span" fontSize={tokens.fontSizes.xl}>
                  $29.99
                </Text>
                <Text as="span" color={tokens.colors.font.success}>
                  20% off
                </Text>
              </Flex>
              <Button variation="primary">Add to cart</Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {hideOnMobile ? (
        <>
          <Card variation="outlined" columnStart="4" columnEnd="-1">
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
                name="language"
                defaultValue="css"
                labelHidden
              >
                <Radio value="html">html</Radio>
                <Radio value="css">css</Radio>
                <Radio value="javascript">javascript</Radio>
              </RadioGroupField>
            </Flex>
          </Card>
          <Card variation="outlined" columnStart="1" columnEnd="3">
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
          <Card variation="outlined" columnStart="3" columnEnd="-1">
            <Flex direction="column">
              <Flex direction="row" gap={tokens.space.xs}>
                {scale.map((level) => (
                  <Text
                    key={level}
                    fontSize={tokens.fontSizes.xl}
                    color={tokens.colors.font[level]}
                  >
                    Aa
                  </Text>
                ))}
              </Flex>
              <Flex direction="row" gap={tokens.space.xs}>
                {colorKeys.map((key) => (
                  <Swatch key={key} color={tokens.colors.brand.primary[key]} />
                ))}
              </Flex>
              <Flex direction="row" gap={tokens.space.xs}>
                {colorKeys.map((key) => (
                  <Swatch
                    key={key}
                    color={tokens.colors.brand.secondary[key]}
                  />
                ))}
              </Flex>
            </Flex>
          </Card>
          <Card variation="outlined" columnStart="1" columnEnd="2">
            <Flex
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <SwitchField label="switch" labelPosition="end" />
            </Flex>
          </Card>
          <Card variation="outlined" columnStart="2" columnEnd="-1">
            <Tabs>
              <TabItem title="Sports"></TabItem>

              <TabItem
                title={
                  <View>
                    Donuts{' '}
                    <Badge size="small" variation="success">
                      new
                    </Badge>
                  </View>
                }
              ></TabItem>
            </Tabs>
          </Card>
        </>
      ) : null}
    </Grid>
  );
};

export const ThemeSwitcher = ({ colorMode }) => {
  const [theme, setTheme] = React.useState('default');
  const [copied, setCopied] = React.useState(false);
  const {
    query: { platform = 'react' },
  } = useCustomRouter();
  const { tokens } = useTheme();
  const hideOnMobile = useBreakpointValue({
    base: false,
    large: true,
  });

  const isTablet = useBreakpointValue({
    base: false,
    medium: true,
  });

  const isMobile = useBreakpointValue({
    base: true,
    small: false,
  });

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      gap={tokens.space.large}
      padding={tokens.space.xl}
    >
      <ToggleButtonGroup
        value={theme}
        isExclusive
        onChange={(value) => {
          setTheme(value as string);
        }}
      >
        <ToggleButton value="default" gap={tokens.space.xs}>
          <Icon
            ariaLabel=""
            paths={[
              {
                d: 'M5.22274 17.8571H11.9827L13.7143 20.9048H13.6655H0L4.8154 12.5604L6.83337 9.06616L8.56591 12.0683L5.22274 17.8571ZM7.74389 7.48595L9.40738 4.60353L18.8218 20.9047H15.4878L7.74389 7.48595ZM10.3333 3H13.6628L24 20.9048H20.6662L10.3333 3Z',
                fillRule: 'evenodd',
              },
            ]}
          />
          {isMobile ? '' : 'Default'}
        </ToggleButton>
        <ToggleButton value="terminal" gap={tokens.space.xs}>
          <Icon ariaLabel="" as={CgTerminal} />
          {isMobile ? '' : 'Terminal'}
        </ToggleButton>
        <ToggleButton value="synthwave" gap={tokens.space.xs}>
          <Icon ariaLabel="" as={CgLinear} />
          {isMobile ? '' : 'Synthwave'}
        </ToggleButton>
        <ToggleButton value="classic" gap={tokens.space.xs}>
          <Icon ariaLabel="" as={CgCopyright} />
          {isMobile ? '' : 'Classic'}
        </ToggleButton>
      </ToggleButtonGroup>
      <Flex direction="row" width="100%">
        {hideOnMobile ? (
          <HomeCode flex="1" columnStart="2" columnEnd="-1" position="relative">
            {/* <CopyToClipboard text={themePreval[theme].string} onCopy={copy}>
            <Button
              size="small"
              // position='absolute'
              disabled={copied}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </CopyToClipboard> */}
            <HomeCodeHighlight
              withLines
              code={
                platform === 'react'
                  ? themePreval[theme].string
                  : themePreval[theme].css
              }
              language={platform === 'react' ? 'jsx' : 'css'}
            />
          </HomeCode>
        ) : null}
        <View flex="1" minWidth="50%">
          <ThemeProvider theme={themePreval[theme].code} colorMode={colorMode}>
            <Preview />
          </ThemeProvider>
        </View>
      </Flex>
    </Flex>
  );
};
