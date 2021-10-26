import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import {
  Alert,
  Heading,
  Tabs,
  TabItem,
  Card,
  Flex,
  defaultTheme,
  AmplifyProvider,
  createTheme,
  Theme,
  Button,
} from '@aws-amplify/ui-react';

import { AlertPropControls } from './AlertPropControls';
import { useAlertProps } from './useAlertProps';
import { AlertThemeControls, useAlertThemeProps } from './AlertThemeControls';

const propsToCode = (props) => `import { Alert } from '@aws-amplify/ui-react';

<Alert
  variation="${props.variation}"
  isDismissible={${props.isDismissible}}
  hasIcon={${props.hasIcon}}
  iconSize={${props.iconSize}}
  heading="${props.heading}"
  headingLevel={${props.headingLevel}}
  >
  ${props.body}
</Alert>`;

export const AlertDemo = () => {
  const [copied, setCopied] = useState(false);
  const alertProps = useAlertProps({
    variation: 'info',
    isDismissible: false,
    hasIcon: true,
    iconSize: 'large',
    heading: 'Alert heading',
    headingLevel: 6,
    body: 'This is the alert message',
  });

  const alertThemeProps = useAlertThemeProps({
    backgroundColor: defaultTheme.tokens.components.alert.backgroundColor.value,
  });

  const [theme, setTheme] = useState<Theme>(
    createTheme({ name: 'alert-theme' })
  );

  return (
    <Card
      className="docs-component-demo"
      width="100%"
      style={{ marginBottom: 'var(--amplify-space-large)' }}
    >
      <Flex direction="row" alignItems="stretch">
        <Flex direction="column" style={{ flexGrow: 1 }}>
          <Alert
            variation={alertProps.variation}
            isDismissible={alertProps.isDismissible}
            hasIcon={alertProps.hasIcon}
            iconSize={alertProps.iconSize}
            heading={alertProps.heading}
            headingLevel={alertProps.headingLevel}
          >
            {alertProps.body}
          </Alert>
          <Tabs>
            <TabItem title="Props">
              <AlertPropControls {...alertProps} />
            </TabItem>
            <TabItem title="Theme">
              <div />
            </TabItem>
          </Tabs>
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
            code={propsToCode(alertProps)}
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
