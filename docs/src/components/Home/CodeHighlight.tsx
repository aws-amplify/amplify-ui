import { CopyToClipboard } from 'react-copy-to-clipboard';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { View, Text } from '@aws-amplify/ui-react';
import classnames from 'classnames';

export const HomeCodeHighlight = ({
  className = '',
  code = '',
  language = 'jsx',
  withLines = false,
  ...rest
}) => {
  return (
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
  );
};
