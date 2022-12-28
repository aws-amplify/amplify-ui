import { useRef, useState } from 'react';
import classNames from 'classnames';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdOutlineWidgets,
} from 'react-icons/md';
import {
  Heading,
  Text,
  View,
  Card,
  Flex,
  CheckboxField,
  RadioGroupField,
  Radio,
  SliderField,
  SearchField,
  SwitchField,
  Tabs,
  TabItem,
  Badge,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Pagination,
  usePagination,
} from '@aws-amplify/ui-react';
import { HomeCTA } from '@/components/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';
import { upperFirst } from 'lodash';
import { trackScroll } from '@/utils/track';

const Center = ({ children }) => (
  <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
    {children}
  </Flex>
);

const Preview = () => {
  const [exclusiveValue, setExclusiveValue] = useState('align-left');

  const paginationProps = usePagination({
    totalPages: 99,
    currentPage: 12,
  });

  const direction = ['column', 'column', 'row'];

  return (
    <Flex direction="column" width="100%">
      <Flex direction={direction}>
        <Card variation="elevated">
          <Center>
            <SwitchField label="Switch" labelPosition="end" />
          </Center>
        </Card>
        <Card variation="elevated" flex="1" display={['none', 'block']}>
          <Center>
            <Pagination {...paginationProps} />
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
              name="primitive-language"
              defaultValue="css"
              direction="row"
              gap="small"
              labelHidden
            >
              <Radio value="html">HTML</Radio>
              <Radio value="css">CSS</Radio>
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
    <View as="section" className="docs-home-section docs-grid-bg">
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
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Primitive');
  }

  return (
    <View
      as="section"
      className={classNames(
        'docs-home-section',
        'docs-grid-bg',
        'fade-in',
        isVisible && 'shown'
      )}
      backgroundColor="background.secondary"
      ref={ref}
    >
      <Flex direction="column" gap="large" className="docs-home-subsection">
        <Heading
          level={2}
          className={classNames('expand-out', isVisible && 'shown')}
        >
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
              These components are themeable, responsive, composable, and
              accessible. They play nicely with other UI components or styling
              frameworks.
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
