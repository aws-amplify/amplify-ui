import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Divider, Flex, View, useTheme } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';

interface DemoProps {
  children: React.ReactNode;
  propControls?: React.ReactNode;
  themeControls?: React.ReactNode;
  code: string;
  childrenOverflow?: React.CSSProperties['overflow'];
}

export const Demo = ({
  children,
  childrenOverflow = 'auto',
  propControls,
  themeControls,
  code,
}: DemoProps) => {
  const [copied, setCopied] = React.useState(false);
  const { tokens } = useTheme();

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <View
      className="docs-component-demo"
      display={{ base: 'none', medium: 'block' }}
    >
      <Flex
        direction={{
          base: 'column',
          medium: 'row',
        }}
        alignItems="stretch"
      >
        <Flex direction="column" flex="1">
          <View overflow={childrenOverflow} padding="5px">
            {children}
          </View>
          <Divider
            margin="20px 0 0"
            border={`2px solid ${tokens.colors.border.secondary}`}
          />
          {propControls && (
            <View padding={`${tokens.space.medium} 0`}>{propControls}</View>
          )}
        </Flex>
        <View
          flex="1"
          overflow="auto"
          position="relative"
          backgroundColor={tokens.colors.background.secondary}
        >
          <CopyButton
            className="example-copy-button"
            copyText={code}
            size="small"
          />
          <Highlight Prism={defaultProps.Prism} code={code} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className}
                style={{ ...style, maxHeight: '100%' }}
              >
                <code className={className}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </View>
      </Flex>
    </View>
  );
};
