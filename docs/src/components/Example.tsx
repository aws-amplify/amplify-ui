import * as React from 'react';

import { Card, Flex, useTheme } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className = '' }: ExampleProps) {
  const { tokens } = useTheme();
  return (
    <Card
      variation="outlined"
      className={`example ${className}`}
      style={{ marginBottom: `${tokens.space.large}` }}
    >
      <Flex direction="column">{children}</Flex>
    </Card>
  );
}

export function ExampleCode({ children }) {
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    setText(ref.current.innerText);
  }, [children]);

  return (
    <div className="example-code">
      <CopyButton
        className="example-copy-button"
        copyText={text}
        size="small"
      />
      <div ref={ref}>{children}</div>
    </div>
  );
}
