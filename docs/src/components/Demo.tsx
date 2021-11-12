import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Tabs, TabItem, Card, Flex, View, Button } from '@aws-amplify/ui-react';

export const Demo = ({ children, propControls, themeControls, code }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="docs-component-demo">
      <Flex direction="row" alignItems="stretch">
        <Flex direction="column" width="50%">
          {children}
          <Tabs>
            <TabItem title="Props">{propControls}</TabItem>
            {themeControls ?? <TabItem title="Theme">{themeControls}</TabItem>}
          </Tabs>
        </Flex>
        <View width="50%" position="relative">
          <CopyToClipboard text={code} onCopy={copy}>
            <Button
              size="small"
              className="example-copy-button"
              disabled={copied}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </CopyToClipboard>
          <Highlight Prism={defaultProps.Prism} code={code} language="jsx">
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
