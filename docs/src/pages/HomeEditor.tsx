import * as React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveContext,
  ContextProps,
} from 'react-live';
import * as AUI from '@aws-amplify/ui-react';

const { Flex, View, Alert } = AUI;

const code = `() => {
  const { tokens } = useTheme();
  return (
    <Card variation="elevated">
      <Flex direction="row" alignItems="flex-start">
        <Image src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80"
          alt="Grey chair" width="8rem"/>
        <Flex direction="column" gap={tokens.space.xs}>
          <Flex direction="row">
            <Badge variation="success">New</Badge>
          </Flex>
          <Heading level={3}>
            Product title
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque risus in sem dapibus, nec vestibulum metus mattis. Mauris dignissim maximus tellus, in feugiat nibh rhoncus a.
          </Text>
          <Text
            fontSize={tokens.fontSizes.large}
            color={tokens.colors.font.secondary}>
            $199.99
          </Text>
          <Flex direction='row'>
            <StepperField
              label="Quantity"
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
  )
}`;

const Error = () => {
  const context: ContextProps = React.useContext(LiveContext);
  const { error } = context;
  if (error) {
    return <Alert variation="error">{error}</Alert>;
  } else {
    return null;
  }
};

const HomeEditor = () => {
  return (
    <LiveProvider
      scope={{ ...AUI }}
      theme={{
        plain: {},
        styles: [],
      }}
      code={code}
    >
      <Flex
        direction={{
          base: 'column-reverse',
          xl: 'row',
        }}
        gap="0"
      >
        <View flex="1" className="docs-home-editor">
          <LiveEditor />
        </View>
        <View flex="1" className="docs-home-preview">
          <LivePreview />
        </View>
      </Flex>
      <Error />
    </LiveProvider>
  );
};

export default HomeEditor;
