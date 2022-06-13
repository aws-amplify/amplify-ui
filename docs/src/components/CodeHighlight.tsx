import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { View, Text, Button } from '@aws-amplify/ui-react';

export const HomeCodeHighlight = ({
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
      {withCopy ? (
        <CopyToClipboard text={code} onCopy={copy}>
          <Button size="small" disabled={copied} className="copy-button">
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </CopyToClipboard>
      ) : null}
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
          <View as="pre" className={`${className} ${prismClassName}`}>
            <View
              as="code"
              className={`${className} ${prismClassName} ${
                withLines ? 'with-lines' : ''
              }`}
            >
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
    </>
  );
};
