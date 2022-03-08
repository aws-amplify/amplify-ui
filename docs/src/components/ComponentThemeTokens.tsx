import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { defaultTheme, Tabs, TabItem, useTheme } from '@aws-amplify/ui-react';

const tokensToCode = (tokenObject, lines = []) => {
  Object.keys(tokenObject).forEach((key) => {
    const token = tokenObject[key];
    if (typeof token.value === 'undefined') {
      return tokensToCode(token, lines);
    }
    lines.push(`${token.name}: ${token.value};`);
  });

  return lines.join(`\n`);
};

export const ComponentThemeTokens = ({ name, children, path }) => {
  const { tokens } = useTheme();
  const componentTokens = defaultTheme.tokens.components[name];

  return (
    <>
      <Tabs>
        <TabItem title="Theme object">{children}</TabItem>
        <TabItem title="CSS variables">
          <Highlight
            Prism={defaultProps.Prism}
            code={tokensToCode(componentTokens)}
            language="css"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
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
        </TabItem>
      </Tabs>
    </>
  );
};
