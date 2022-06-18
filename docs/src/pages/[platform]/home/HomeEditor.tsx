import * as React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveContext,
  ContextProps,
} from 'react-live';
import * as AUI from '@aws-amplify/ui-react';
import { HomeCode } from './HomeCode';

const { Flex, View, Alert } = AUI;

const code = `() => {
  const { tokens } = useTheme();
  return (
    <Card variation="elevated">
      <Flex direction="row" alignItems="flex-start">
        <Image src="/amplify-placeholder.svg"
          alt="Amplify" width="8rem"/>
        <Flex direction="column" gap="xs">
          <Flex direction="row">
            <Badge variation="success">New</Badge>
          </Flex>
          <Text fontSize="large" fontWeight="semibold">
            Product title
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque risus in sem dapibus, nec vestibulum metus mattis. Mauris dignissim maximus tellus, in feugiat nibh rhoncus a.
          </Text>
          <Text
            fontSize="large"
            color="secondary">
            $199.99
          </Text>
          <Flex direction="row">
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
        plain: {
          overflow: 'visible',
        },
        styles: [],
      }}
      code={code}
    >
      <View className="docs-home-editor">
        {/* <HomeCode maxHeight="80vh" overflow="scroll" flex="1" data-editable> */}
        <View
          flex="1"
          className="docs-home-editor__code-panel with-lines scrollable"
        >
          <LiveEditor />
        </View>
        <View flex="1" className="docs-home-editor__preview-panel">
          <LivePreview />
        </View>
      </View>
      <Error />
    </LiveProvider>
  );
};

export default HomeEditor;
