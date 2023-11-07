import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { View, Text, Button } from '@aws-amplify/ui-react';
import { classNames } from '@aws-amplify/ui';

export const CodeHighlight = ({
  className = '',
  code = '',
  language = 'jsx',
  withLines = false,
  withCopy = false,
  ...rest
}) => {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <>
      <Highlight
        Prism={defaultProps.Prism}
        code={code}
        language={language as Language}
      >
        {({
          className: prismClassName,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <View
            as="pre"
            className={classNames(
              className,
              prismClassName,
              withLines && 'with-lines'
            )}
          >
            <View as="code" className={classNames(className, prismClassName)}>
              {tokens.map((line, i) => (
                <View
                  className="code-line"
                  key={i}
                  {...getLineProps({ line, key: i })}
                >
                  {line.map((token, key) => (
                    <Text
                      as="span"
                      key={key}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}
      </Highlight>
      {withCopy ? (
        <CopyToClipboard text={code} onCopy={copy}>
          <Button size="small" variation="link" disabled={copied}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </CopyToClipboard>
      ) : null}
    </>
  );
};
