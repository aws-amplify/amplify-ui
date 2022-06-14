import * as React from 'react';

import { Card, Flex, useTheme, Button } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';
import { StackBlitzIcon } from './Icons';
import { openReactStackBlitz } from '@/utils/openInStackblitz';

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

interface ExampleCodeProps {
  children: React.ReactNode;
  name?: string;
}

export function ExampleCode({ children, name }: ExampleCodeProps) {
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    setText(ref.current.innerText);
  }, [children]);

  return (
    <div className="example-code">
      <div ref={ref}>{children}</div>
      <Flex
        direction="row"
        justifyContent="flex-end"
        backgroundColor="background.primary"
        padding="small"
      >
        {name ? (
          <Button
            size="small"
            gap="xs"
            variation="link"
            onClick={() => {
              openReactStackBlitz({
                name,
                text,
              });
            }}
          >
            <StackBlitzIcon />
            Open in StackBlitz
          </Button>
        ) : null}
        <CopyButton
          // className="example-copy-button"
          copyText={text}
          size="small"
          variation="link"
        />
      </Flex>
    </div>
  );
}
