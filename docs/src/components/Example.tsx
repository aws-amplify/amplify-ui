import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Card, Button, Flex, useTheme } from '@aws-amplify/ui-react';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className = '' }: ExampleProps) {
  const { tokens } = useTheme();
  return (
    <Card
      className={`example ${className}`}
      style={{ marginBottom: `${tokens.space.large}` }}
    >
      <Flex direction="column">{children}</Flex>
    </Card>
  );
}

export function ExampleCode({ children }) {
  const [copied, setCopied] = React.useState(false);
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    setText(ref.current.innerText);
    return () => {};
  }, [children]);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="example-code">
      <CopyToClipboard text={text} onCopy={copy}>
        <Button size="small" isLoading={copied} className="example-copy-button">
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </CopyToClipboard>
      <div ref={ref}>{children}</div>
    </div>
  );
}
