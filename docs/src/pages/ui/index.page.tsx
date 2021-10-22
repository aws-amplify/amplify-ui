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
} from '@aws-amplify/ui-react';

import { HomeLogo } from '@/components/HomeLogo';

const flipper = {
  100: 10,
  90: 20,
  80: 40,
  60: 60,
  40: 80,
  20: 90,
  10: 100,
};

const usePalette = (str) => {
  return Object.keys(flipper).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: { value: `{colors.${str}.${curr}.value}` },
    };
  }, {});
};

const HomePage = () => {
  const testTheme = createTheme({
    name: 'test-theme',
    tokens: {
      colors: {
        brand: {
          primary: usePalette('blue'),
        },
      },
    },
  });

  const router = useRouter();
  const framework = router.query.platform ?? 'react';

  return (
    <div>
      <View as="section" className="docs-home-section-bg">
        <HomeLogo />
        <Card padding={`${testTheme.tokens.space.xl}`}>
          <Text fontSize={`${testTheme.tokens.fontSizes.xl}`}>
            Amplify UI is an open-source design system with cloud-connected
            workflows and components that simplify building accessible,
            performant, and beautiful applications on React, Angular, and Vue
            (more coming soon).
          </Text>
          <Flex
            direction="row"
            padding={`${testTheme.tokens.space.medium} 0 0 0`}
          >
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

      <View as="section" className="docs-home-section docs-home-preview">
        <Button variation="primary">Buy Now</Button>
        <Badge variation="success">Available</Badge>
        <SwitchField label="Pizza" />
        <SearchField label="Search" labelHidden={true} />
        <Button variation="primary" as="a" href="/getting-started">
          Get started
        </Button>
        <Button>Get started</Button>

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
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={`${testTheme.tokens.colors.background.secondary}`}
      >
        <Heading level={2}>Accessible</Heading>
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={`${testTheme.tokens.colors.brand.secondary[10]}`}
      >
        <Grid
          templateColumns="1fr 1fr"
          templateRows="10rem 10rem"
          gap="var(--amplify-space-small)"
        >
          <Card>
            <Text>
              Connected components that simplify complex cloud-connected
              workflows
            </Text>
          </Card>
          <Card>
            <Text>
              Primitive components that create consistency across Amplify UI and
              allow you to build complete applications that fit your brand, like
              Buttons and Badges.
            </Text>
          </Card>
          <Card>
            <Text>
              Data-bound components that make it easy to display dynamic data,
              like DataStoreCollections.
            </Text>
          </Card>
          <Card>
            <Text>
              Theming capabilities that allow you to customize the appearance of
              Amplify UI to match your brand.
            </Text>
          </Card>
        </Grid>
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
