import * as React from 'react';

import { Card, Flex } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className = '' }: ExampleProps) {
  return (
    <Card
      variation="outlined"
      className={`example ${className}`}
      backgroundColor="inherit"
      marginBottom="space.large"
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
        variation="link"
      />
      <div ref={ref}>{children}</div>
    </div>
  );
}
