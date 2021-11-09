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
  View,
  Button,
} from '@aws-amplify/ui-react';

import { AlertPropControls } from './AlertPropControls';
import { useAlertProps } from './useAlertProps';
import { AlertThemeControls, useAlertThemeProps } from './AlertThemeControls';

const alertTheme = defaultTheme.tokens.components.alert;

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

const AlertThemeProvider = ({
  backgroundColor,
  infoBackgroundColor,
  paddingVertical,
  paddingHorizontal,
  children,
}) => {
  const theme = createTheme({
    name: 'alert-theme',
    tokens: {
      components: {
        alert: {
          backgroundColor: { value: backgroundColor },
          paddingVertical: { value: paddingVertical },
          paddingHorizontal: { value: paddingHorizontal },
          info: {
            backgroundColor: { value: infoBackgroundColor },
          },
        },
      },
    },
  });

  return (
    <AmplifyProvider components={{}} theme={theme}>
      {children}
    </AmplifyProvider>
  );
};

export const AlertDemo = () => {
  const [copied, setCopied] = useState(false);
  const alertProps = useAlertProps({
    isDismissible: false,
    hasIcon: true,
    iconSize: 'large',
    heading: 'Alert heading',
    headingLevel: 6,
    body: 'This is the alert message',
  });

  const alertThemeProps = useAlertThemeProps({
    backgroundColor: alertTheme.backgroundColor.original,
    paddingHorizontal: alertTheme.paddingHorizontal.original,
    paddingVertical: alertTheme.paddingVertical.original,
    info: {
      backgroundColor: alertTheme.info.backgroundColor.original,
    },
  });

  return (
    <Card
      className="docs-component-demo"
      width="100%"
      style={{ marginBottom: 'var(--amplify-space-large)' }}
    >
      <Flex direction="row" alignItems="stretch">
        <Flex direction="column" style={{ width: '50%' }}>
          <AlertThemeProvider
            backgroundColor={alertThemeProps.backgroundColor}
            infoBackgroundColor={alertThemeProps.infoBackgroundColor}
            paddingVertical={alertThemeProps.paddingVertical}
            paddingHorizontal={alertThemeProps.paddingHorizontal}
          >
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
          </AlertThemeProvider>
          <Tabs>
            <TabItem title="Props">
              <AlertPropControls {...alertProps} />
            </TabItem>
            {/* <TabItem title="Theme">
              <AlertThemeControls {...alertThemeProps} />
            </TabItem> */}
          </Tabs>
        </Flex>
        <View style={{ width: '50%', position: 'relative' }}>
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
              <pre className={className} style={{ ...style, height: '100%' }}>
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
        </View>
      </Flex>
    </Card>
  );
};
