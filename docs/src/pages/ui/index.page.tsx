import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Badge,
  Card,
  SearchField,
  SwitchField,
  TextField,
  Tabs,
  TabItem,
  AmplifyProvider,
  createTheme,
  Heading,
  View,
  Text,
  Grid,
  IconCopyAll,
  Flex,
  Radio,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  StepperField,
  SelectField,
  Rating,
  Image,
} from '@aws-amplify/ui-react';

import { HomeLogo } from '@/components/HomeLogo';
import { theme } from '../theme';

const { tokens } = theme;

const HomePage = () => {
  // const testTheme = createTheme({
  //   name: 'test-theme',
  //   tokens: {
  //     colors: {
  //       brand: {
  //         primary: usePalette('blue'),
  //       },
  //     },
  //   },
  // });

  const router = useRouter();
  const framework = router.query.platform ?? 'react';

  return (
    <div>
      <View as="section" className="docs-home-section-bg">
        <HomeLogo />
        <Card padding={`${tokens.space.xl}`}>
          <Text fontSize={`${tokens.fontSizes.xl}`}>
            Amplify UI is an open-source design system with cloud-connected
            workflows and components that simplify building accessible,
            performant, and beautiful applications on React, Angular, and Vue
            (more coming soon).
          </Text>
          <Flex direction="row" padding={`${tokens.space.medium} 0 0 0`}>
            <Button variation="primary" as="a" href="/getting-started">
              Get started
            </Button>
            <TextField
              label=""
              labelHidden={true}
              isReadOnly={true}
              className="install-code"
              innerEndComponent={
                <Button variation="link">
                  <IconCopyAll /> Copy
                </Button>
              }
              value={`npm i @aws-amplify/ui-${framework}`}
            />
          </Flex>
        </Card>
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={`${tokens.colors.background.secondary}`}
      >
        <Grid
          templateColumns="1fr 1fr"
          templateRows="10rem 10rem"
          gap={`${tokens.space.small}`}
        >
          <Card className="docs-home-feature-card">
            <Heading level={3}>Accessible by default</Heading>
            <Text>
              Connected components that simplify complex cloud-connected
              workflows
            </Text>
          </Card>
          <Card className="docs-home-feature-card">
            <Heading level={3}>Minimal footprint, maximum performance.</Heading>
            <Text>
              Primitive components that create consistency across Amplify UI and
              allow you to build complete applications that fit your brand, like
              Buttons and Badges.
            </Text>
          </Card>
          <Card className="docs-home-feature-card">
            <Heading level={3}>Respect the platform and framework</Heading>
            <Text>
              We want to share as much as possible between platforms (like
              themes and schemas), we also want to respect each platform
              identity and rules when possible (e.g following name conventions
              and idioms).
            </Text>
          </Card>
          <Card className="docs-home-feature-card">
            <Heading level={3}>Type-safety</Heading>
            <Text>
              Theming capabilities that allow you to customize the appearance of
              Amplify UI to match your brand.
            </Text>
          </Card>
        </Grid>
      </View>

      <View as="section" className="docs-home-section">
        <Flex direction="row">
          <View style={{ flex: '1' }}>
            <Heading level={2}>Primitive Components</Heading>
            <Text className="docs-home-description">
              Primitive components that create consistency across Amplify UI and
              allow you to build complete applications that fit your brand, like
              Buttons and Badges.
            </Text>
          </View>

          <Grid
            templateColumns="1fr 1fr"
            templateRows="1fr 1fr 1fr"
            gap={`${tokens.space.medium}`}
            style={{ flex: '1' }}
            className="docs-home-preview"
          >
            <Card columnSpan={2}>
              <Flex direction="row">
                <Image src="http://placekitten.com/g/200/300" />
                <View>
                  <Heading level={4}></Heading>
                  <Badge variation="success">Available</Badge>
                  <Badge variation="info">New</Badge>
                </View>
              </Flex>
            </Card>
            <Card rowSpan={2}>
              <SelectField label="Room type">
                <option></option>
              </SelectField>
              <StepperField label="Guests" />
              <Rating value={4} />
            </Card>
            <Card>
              <Tabs>
                <TabItem title="Tab item">
                  <p></p>
                </TabItem>
                <TabItem title="Tab item">
                  <p></p>
                </TabItem>
              </Tabs>
            </Card>

            <Card>
              <SearchField label="Search" labelHidden={true} />
              <Button variation="primary" as="a" href="/getting-started">
                Get started
              </Button>
              <Button>Get started</Button>
            </Card>
          </Grid>
        </Flex>
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={`${tokens.colors.background.secondary}`}
      >
        <Flex direction="row">
          <View style={{ flex: '1' }}></View>
          <View style={{ flex: '1' }}>
            <Heading level={2}>Connected Components</Heading>
            <Text className="docs-home-description">
              Connected components that simplify complex cloud-connected
              workflows
            </Text>
          </View>
        </Flex>
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={`${tokens.colors.background.primary}`}
      >
        <Flex direction="row">
          <View style={{ flex: '1' }}>
            <Heading level={2}>Theming</Heading>
            <Text className="docs-home-description">
              Theming capabilities that allow you to customize the appearance of
              Amplify UI to match your brand.
            </Text>
          </View>
          <View style={{ flex: '1' }}></View>
        </Flex>
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={`${tokens.colors.background.secondary}`}
      >
        <Heading level={2}>Accessible</Heading>
      </View>

      <View as="section" className="docs-home-section">
        <Heading level={2}>Looking for other Amplify Products?</Heading>
        <Card as="a" href="https://docs.amplify.aws">
          <Heading level={3}>Amplify Console</Heading>
        </Card>
      </View>
    </div>
  );
};

export default HomePage;
