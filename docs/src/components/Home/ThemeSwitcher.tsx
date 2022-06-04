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
  Theme,
  ThemeProvider,
  Grid,
  View,
  SwitchField,
  SliderField,
  TabItem,
  Tabs,
  Heading,
  HeadingLevel,
  Alert,
  useTheme,
  Loader,
  Rating,
  Icon,
  CheckboxField,
  RadioGroupField,
  Radio,
  SearchField,
} from '@aws-amplify/ui-react';

import { CgTerminal, CgOverflow, CgLinear, CgCopyright } from 'react-icons/cg';

import themePreval from './themes/index.preval';
import { useCustomRouter } from '@/components/useCustomRouter';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md';

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
  return (
    <Grid
      columnGap={tokens.space.small}
      rowGap={tokens.space.small}
      templateColumns="1fr 1fr 1fr 1fr"
    >
      <Card variation="outlined" columnStart="1" columnEnd="4">
        <Flex direction="column">
          <Alert variation="info" heading="Flash sale!" />
          <Flex direction="row">
            <Flex
              alignItems="center"
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
          {/* <ToggleButtonGroup
          justifyContent='center'
          value={exclusiveValue}
          isExclusive
          onChange={(value: string) => setExclusiveValue(value)}
        >
          <ToggleButton value="align-left" ariaLabel="align left">
            <MdFormatAlignLeft />
          </ToggleButton>
          <ToggleButton value="align-center" ariaLabel="align center">
            <MdFormatAlignCenter />
          </ToggleButton>
          <ToggleButton value="align-right" ariaLabel="align right">
            <MdFormatAlignRight />
          </ToggleButton>
          <ToggleButton value="align-justify" ariaLabel="align justify">
            <MdFormatAlignJustify />
          </ToggleButton>
        </ToggleButtonGroup> */}
          <Loader variation="linear" />
          <SearchField placeholder="Search" label="Search" />
        </Flex>
      </Card>
      <Card variation="outlined" columnStart="3" columnEnd="-1">
        <Flex direction="column">
          <Flex direction="row" gap={tokens.space.xs}>
            {scale.map((level) => (
              <Text
                fontSize={tokens.fontSizes.xl}
                color={tokens.colors.font[level]}
              >
                Aa
              </Text>
            ))}
          </Flex>
          {/* {[1,2,3].map(level => <Heading key={level} level={level as HeadingLevel}>Heading {level}</Heading>)} */}
          <Flex direction="row" gap={tokens.space.xs}>
            {colorKeys.map((key) => (
              <Swatch key={key} color={tokens.colors.brand.primary[key]} />
            ))}
          </Flex>
          <Flex direction="row" gap={tokens.space.xs}>
            {colorKeys.map((key) => (
              <Swatch key={key} color={tokens.colors.brand.secondary[key]} />
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

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Flex direction="column" alignItems="center">
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
          Default
        </ToggleButton>
        <ToggleButton value="terminal" gap={tokens.space.xs}>
          <CgTerminal />
          Terminal
        </ToggleButton>
        <ToggleButton value="synthwave" gap={tokens.space.xs}>
          <CgLinear />
          Synthwave
        </ToggleButton>
        <ToggleButton value="classic" gap={tokens.space.xs}>
          <CgCopyright />
          Classic
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid
        columnGap={tokens.space.large}
        templateColumns="1fr 1fr"
        templateRows="1fr"
        width="100%"
      >
        <View flex="1" columnStart="1" columnEnd="2">
          <ThemeProvider theme={themePreval[theme].code} colorMode={colorMode}>
            <Preview />
          </ThemeProvider>
        </View>
        <View flex="1" columnStart="2" columnEnd="-1" position="relative">
          {/* <CopyToClipboard text={themePreval[theme].string} onCopy={copy}>
          <Button
            size="small"
            // position='absolute'
            disabled={copied}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </CopyToClipboard> */}
          <View position="relative" height="100%">
            <Highlight
              Prism={defaultProps.Prism}
              code={themePreval[theme].string}
              language="jsx"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    position: 'absolute',
                    top: '0',
                    right: 0,
                    left: 0,
                    bottom: 0,
                    maxHeight: '100%',
                    height: '100%',
                    overflowY: 'auto',
                  }}
                >
                  <code className={className}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          </View>
        </View>
      </Grid>
      <Link href={`${platform}/theming`} passHref>
        <Button size="large" as="a">
          Learn more about theming
        </Button>
      </Link>
    </Flex>
  );
};
