import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps } from 'prism-react-renderer';
import {
  Tabs,
  TabItem,
  Card,
  Flex,
  View,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';

interface DemoProps {
  children: React.ReactNode;
  propControls: React.ReactNode;
  themeControls?: React.ReactNode;
  code: string;
}

export const Demo = ({
  children,
  propControls,
  themeControls,
  code,
}: DemoProps) => {
  const [copied, setCopied] = useState(false);
  const { tokens } = useTheme();

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="docs-component-demo">
      <Flex direction="row" alignItems="stretch">
        <Flex direction="column" flex="1">
          <View>{children}</View>
          <Tabs>
            <TabItem title="Props">
              <View padding={`${tokens.space.medium} 0`}>{propControls}</View>
            </TabItem>
            {themeControls ?? <TabItem title="Theme">{themeControls}</TabItem>}
          </Tabs>
        </Flex>
        <View flex="1" position="relative">
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
