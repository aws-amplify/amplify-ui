import * as React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveContext,
  ContextProps,
} from 'react-live';
// only import the primitives to prevent importing sideEffects
import { primitives as AUI } from '@aws-amplify/ui-react';
import { trackClick } from '@/utils/track';

const { View, Alert } = AUI;

const code = `<Card variation="elevated">
  <Flex alignItems="flex-start">
    <Image src="/amplify-placeholder.svg"
      alt="Amplify" width="8rem"/>
    <Flex direction="column" gap="xs">
      <Flex>
        <Badge variation="success">New</Badge>
      </Flex>
      <Text fontSize="large" fontWeight="semibold">
        Product title
      </Text>
      <Text color="font.tertiary">
        Product description
      </Text>
      <Text
        fontSize="large"
        color="secondary">
        $199.99
      </Text>
      <Flex>
        <StepperField
          label="Quantity"
          min={0}
          max={10}
          step={1}
          defaultValue={1}
          labelHidden
        />
        <Button variation="primary">Add to cart</Button>
      </Flex>
    </Flex>
  </Flex>
</Card>`;

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
  const [edited, setEdited] = React.useState(false);
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
        <View
          flex="1"
          className="docs-home-editor__code-panel with-lines scrollable"
        >
          <LiveEditor
            onKeyDown={(e) => {
              // This makes sure the editor is not a focus trap, allowing customers to 'tab' out of the editor
              if (e.keyCode === 9) {
                // tab key
                e.preventDefault();
                e.target.blur();
                return;
              }
              if (!edited) {
                trackClick('HomeCodeEdit');
                setEdited(true);
              }
            }}
          />
        </View>
        <View
          aria-label="Live preview results"
          flex="1"
          className="docs-home-editor__preview-panel"
        >
          <LivePreview />
        </View>
      </View>
      <Error />
    </LiveProvider>
  );
};

export default HomeEditor;
