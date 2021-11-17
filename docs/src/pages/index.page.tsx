import * as React from 'react';
import { useRouter } from 'next/router';
// import { Sandpack, codesandboxDarkTheme } from '@codesandbox/sandpack-react';
import {
  Button,
  Card,
  TextField,
  Heading,
  View,
  Text,
  IconContentCopy,
  Flex,
  Image,
} from '@aws-amplify/ui-react';

import { HomeLogo } from './HomeLogo';
import { theme } from '../theme';

const { tokens } = theme;

const code = `import { AmplifyProvider, Button, Card, Text, Heading, Flex, Badge, createTheme, Image, View, StepperField, Rating } from '@aws-amplify/ui-react'; 
import '@aws-amplify/ui-react/styles.css';

const theme = createTheme({});

export default function App() {
  return (
    <AmplifyProvider theme={theme}>
      <Card>
        <Flex direction="row">
          <Image src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"
            width="8rem"/>
          <Flex direction="column" gap={\`\${theme.tokens.space.xs}\`}>
            <Flex direction="row">
              <Badge variation="success">New</Badge>
            </Flex>
            <Heading level={3}>
              Product title
            </Heading>
            <Rating value={4.5} />
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque risus in sem dapibus, nec vestibulum metus mattis. Mauris dignissim maximus tellus, in feugiat nibh rhoncus a.</Text>
            <Flex direction="row">
              <StepperField
                label="Stepper"
                defaultValue={1}
                min={0}
                max={10}
                step={1}
                labelHidden
              />
              <Button variation="primary">Add to cart</Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </AmplifyProvider>
  )
}`;

const HomePage = ({ colorMode }) => {
  const router = useRouter();
  const framework = router.query.platform ?? 'react';
  const sandPackTheme = {
    ...(colorMode === 'dark' ? codesandboxDarkTheme : {}),
    typography: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
  };
  return (
    <div>
      <View as="section" className="docs-home-section-bg">
        <HomeLogo />
        <Image
          alt=""
          className="docs-home-vue"
          src="/svg/integrations/vue.svg"
        />
        <Image
          alt=""
          className="docs-home-react"
          src="/svg/integrations/react.svg"
        />
        <Image
          alt=""
          className="docs-home-angular"
          src="/svg/integrations/angular.svg"
        />
        <Card padding={`${tokens.space.xl}`}>
          <Text fontSize={`${tokens.fontSizes.xl}`}>
            Amplify UI is an open-source design system with cloud-connected
            components and primitives that simplify building accessible,
            performant, and beautiful applications in React, Angular, and Vue
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
                  <IconContentCopy /> Copy
                </Button>
              }
              value={`npm i @aws-amplify/ui-${framework}`}
            />
          </Flex>
        </Card>
      </View>
      <View
        backgroundColor={`${tokens.colors.background.secondary}`}
        padding={`${tokens.space.xl}`}
      >
        <Card style={{ width: '100%', padding: 0 }}>
          {/* <Sandpack
            template="react"
            files={{
              '/App.js': code,
            }}
            theme={sandPackTheme}
            options={{
              editorHeight: 500,
              showNavigator: true, // this will show a top navigator bar instead of the refresh button
              showTabs: true, // you can toggle the tabs on/off manually
              showLineNumbers: true, // this is off by default, but you can show line numbers for the editor
              wrapContent: true, // also off by default, this wraps the code instead of creating horizontal overflow
            }}
            customSetup={{
              dependencies: {
                '@aws-amplify/ui-react': '0.0.0-next-202192618169',
                'aws-amplify': 'latest',
              },
              entry: '/index.js',
            }}
          /> */}
        </Card>
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

          {/* <Grid
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
          </Grid> */}
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
        <Heading level={2}>Accessibility</Heading>
      </View>

      <View as="section" className="docs-home-section">
        <Heading level={2}>Looking for other Amplify Products?</Heading>
      </View>
    </div>
  );
};

export default HomePage;
