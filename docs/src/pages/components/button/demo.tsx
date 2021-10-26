import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import {
  Alert,
  Heading,
  Tabs,
  TabItem,
  Card,
  Flex,
  SelectField,
  TextField,
  SwitchField,
  Button,
  ButtonSizes,
  ButtonVariations,
  View,
  useTheme,
} from '@aws-amplify/ui-react';
import { FieldLabeler } from '@/components/FieldLabeler';
import { Example } from '@/components/Example';

const propsToCode = (props) => `import { Button } from '@aws-amplify/ui-react';

<Button
  className="my-favorite-button"
  isDisabled={${props.disabled}}
  isLoading={${props.loading}}
  loadingText="${props.loadingText}"${
  props.variation ? `\n  variation="${props.variation}"` : ''
}${props.size ? `\n  size="${props.size}"` : ''}
  ariaLabel="${props.ariaLabel}"
  isFullWidth={${props.fullWidth}}
>
  ${props.text}
</Button>`;

export const ButtonDemo = () => {
  const { tokens } = useTheme();
  const [copied, setCopied] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fullWidth, setFullWidth] = React.useState<boolean>(false);
  const [loadingText, setLoadingText] = React.useState('Loading...');
  const [ariaLabel, setAriaLabel] = React.useState<string>('');
  const [variation, setVariation] = React.useState<ButtonVariations>();
  const [size, setSize] = React.useState<ButtonSizes>();
  const [text, setText] = React.useState<string>('Click me!');

  return (
    <Card
      className="docs-component-demo"
      width="100%"
      style={{ marginBottom: 'var(--amplify-space-large)' }}
    >
      <Flex direction="row" alignItems="stretch">
        <Flex
          direction="column"
          alignItems="flex-start"
          style={{ flexGrow: 1 }}
        >
          <Button
            className="my-favorite-button"
            isDisabled={disabled}
            isLoading={loading}
            loadingText={loadingText}
            variation={variation}
            size={size}
            onClick={() => alert('hello')}
            ariaLabel={ariaLabel}
            isFullWidth={fullWidth}
            type="button"
          >
            {text}
          </Button>
          <View style={{ alignSelf: 'stretch', width: '100%' }}>
            <Tabs>
              <TabItem title="Props">
                <View padding={`${tokens.space.medium} 0`}>
                  <TextField
                    label="text"
                    value={text}
                    onChange={(event: any) => setText(event.target.value)}
                  />

                  <SelectField
                    label="size"
                    value={size}
                    onChange={(event: any) => setSize(event.target.value)}
                  >
                    <option value="">default</option>
                    <option value="small">small</option>
                    <option value="large">large</option>
                  </SelectField>

                  <SelectField
                    label="variation"
                    value={variation}
                    onChange={(event: any) => setVariation(event.target.value)}
                  >
                    <option value="">default</option>
                    <option value="primary">primary</option>
                    <option value="link">link</option>
                  </SelectField>

                  <SwitchField
                    label="isDisabled"
                    labelPosition="end"
                    checked={disabled}
                    onChange={() => setDisabled(!disabled)}
                  />

                  <SwitchField
                    label="isLoading"
                    labelPosition="end"
                    checked={loading}
                    onChange={() => setLoading(!loading)}
                  />

                  <TextField
                    label="loadingText"
                    value={loadingText}
                    onChange={(event: any) =>
                      setLoadingText(event.target.value)
                    }
                  />
                </View>
              </TabItem>
              <TabItem title="Theme">
                <div />
              </TabItem>
            </Tabs>
          </View>
        </Flex>
        <Flex style={{ flexBasis: '33%', position: 'relative' }}>
          <Button
            size="small"
            className="example-copy-button"
            disabled={copied}
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Highlight
            Prism={defaultProps.Prism}
            code={propsToCode({
              disabled,
              loadingText,
              loading,
              fullWidth,
              ariaLabel,
              variation,
              size,
              text,
            })}
            language="jsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </Flex>
      </Flex>
    </Card>
  );
};
