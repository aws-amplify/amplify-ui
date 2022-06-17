import * as React from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdOutlineWidgets,
} from 'react-icons/md';
import {
  Heading,
  useBreakpointValue,
  Text,
  View,
  Grid,
  Card,
  TextField,
  Flex,
  Alert,
  CheckboxField,
  RadioGroupField,
  Radio,
  SliderField,
  Loader,
  SearchField,
  SwitchField,
  Tabs,
  TabItem,
  Badge,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Pagination,
  Placeholder,
} from '@aws-amplify/ui-react';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';
import { upperFirst } from 'lodash';

const Center = ({ children }) => (
  <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
    {children}
  </Flex>
);

const Preview = () => {
  const [exclusiveValue, setExclusiveValue] = React.useState('align-left');
  const [radioValue, setRadioValue] = React.useState('css');
  const [currentPageIndex, setCurrentPageIndex] = React.useState(4);
  const totalPages = 99;

  const handleOnChange = (newPageIndex, prevPageIndex) => {
    setCurrentPageIndex(newPageIndex);
  };

  const direction = ['column', 'column', 'row'];

  return (
    <Flex direction="column" width="100%">
      <Flex direction={direction}>
        <Card variation="elevated">
          <Center>
            <SwitchField label="switch" labelPosition="end" />
          </Center>
        </Card>
        <Card variation="elevated" flex="1" display={['none', 'block']}>
          <Center>
            <Pagination
              currentPage={currentPageIndex}
              totalPages={totalPages}
              siblingCount={1}
              onChange={handleOnChange}
            />
          </Center>
        </Card>
      </Flex>
      <Flex direction={['column', 'row']}>
        <Card variation="elevated" flex="1">
          <Center>
            <Button>Button</Button>
            <Button variation="primary">Button</Button>
            <Button variation="link">Button</Button>
          </Center>
        </Card>
        <Card variation="elevated" flex="1">
          <Flex
            direction="row"
            justifyContent="center"
            alignContent="center"
            height="100%"
          >
            <ToggleButtonGroup
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
            </ToggleButtonGroup>
          </Flex>
        </Card>
      </Flex>
      <Flex direction={direction}>
        <Card variation="elevated" flex="2">
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
        <Card variation="elevated" flex="1">
          <Center>
            <SearchField placeholder="Search" label="Search" />
          </Center>
        </Card>
      </Flex>
      <Flex direction={direction}>
        <Card variation="elevated" flex="1">
          <Center>
            <RadioGroupField
              label="Language"
              name="language"
              value={radioValue}
              direction="row"
              gap="small"
              onChange={(e) => setRadioValue(e.target.value)}
              labelHidden
            >
              <Radio value="html">html</Radio>
              <Radio value="css">css</Radio>
              <Radio value="javascript">javascript</Radio>
            </RadioGroupField>
          </Center>
        </Card>
        <Card variation="elevated" flex="1">
          <Center>
            <SliderField
              label="Slider"
              labelHidden
              min={0}
              max={100}
              step={1}
              defaultValue={50}
            />
          </Center>
        </Card>
        <Card variation="elevated" flex="1">
          <Center>
            <CheckboxField
              label="Sprinkles"
              value="Sprinkles"
              name="topping"
              defaultChecked
            />
          </Center>
        </Card>
      </Flex>
    </Flex>
  );
};

export const ComingSoonPrimitiveSection = ({ platform }) => {
  return (
    <View as="section" className="docs-home-section docs-grid-bg centered">
      <Flex direction="column" className="docs-home-subsection--thin">
        <Heading level={2} textAlign="center">
          {upperFirst(platform)} primitive components{' '}
          <strong>coming soon</strong>!
        </Heading>
        <View className="docs-home-coming-soon">
          <Preview />
        </View>
      </Flex>
    </View>
  );
};

export const PrimitiveSection = ({ platform, ...rest }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View
      as="section"
      className={`docs-home-section docs-grid-bg fade-in ${
        isVisible ? 'shown' : ''
      }`}
      backgroundColor="background.tertiary"
      ref={ref}
    >
      <Flex direction="column" gap="large" className="docs-home-subsection">
        <Heading level={2}>
          Speed up development with over <br />
          <strong>40 production-ready components</strong>
        </Heading>
        <Flex
          direction={{
            base: 'column',
            xl: 'row',
          }}
          gap="xl"
          alignItems="stretch"
        >
          <Flex direction="column" flex="1">
            <Text className="docs-home-text">
              Amplify UI components are built with plain React and CSS to
              provide a solid foundation for building UIs and design systems.
              These components are theme-able, composable, reusable. They play
              nicely with other UI components or styling frameworks. Interactive
              components can be controlled and uncontrolled.
            </Text>
          </Flex>
          <View flex="1">
            <Preview />
          </View>
        </Flex>

        <HomeCTA href={`/${platform}/components`}>
          <span>View all components</span>
          <MdOutlineWidgets />
        </HomeCTA>
      </Flex>
    </View>
  );
};
