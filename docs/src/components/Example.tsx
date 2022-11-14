import * as React from 'react';

import { Card, Flex, Button, ButtonGroup, View } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';
import { StackBlitzIcon } from './Icons';
import { openReactStackBlitz } from '@/utils/openInStackBlitz';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

interface ExamplePreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ExamplePreview({
  children,
  className = '',
}: ExamplePreviewProps) {
  return (
    <View className={`docs-example__preview ${className}`}>{children}</View>
  );
}

export function Example({ children, className = '' }: ExampleProps) {
  return <View className={`docs-example ${className}`}>{children}</View>;
}

interface ExampleCodeProps {
  children: React.ReactNode;
  reactExport?: string;
}

export function ExampleCode({ children, reactExport }: ExampleCodeProps) {
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    setText(ref.current.innerText);
  }, [children]);

  return (
    <>
      <View className="docs-example__code" ref={ref}>
        {children}
      </View>
      <ButtonGroup
        className="docs-example__actions"
        justifyContent="flex-end"
        size="small"
        variation="link"
        gap="xs"
      >
        {reactExport ? (
          <Button
            gap="xs"
            onClick={() => {
              openReactStackBlitz({
                name: reactExport,
                text,
              });
            }}
          >
            <StackBlitzIcon />
            Open in StackBlitz
          </Button>
        ) : null}
        <CopyButton copyText={text} />
      </ButtonGroup>
    </>
  );
}
