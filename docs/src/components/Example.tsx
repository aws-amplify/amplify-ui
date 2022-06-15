import * as React from 'react';

import {
  View,
  Flex,
  useTheme,
  Button,
  useBreakpointValue,
  CardVariations,
} from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';
import { StackBlitzIcon } from './Icons';
import { openReactStackBlitz } from '@/utils/openInStackblitz';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className = '' }: ExampleProps) {
  return <View className={`docs-example ${className}`}>{children}</View>;
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
      <Flex
        className="docs-example__actions"
        direction="row"
        justifyContent="flex-end"
      >
        {reactExport ? (
          <Button
            size="small"
            gap="xs"
            variation="link"
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
        <CopyButton copyText={text} size="small" variation="link" />
      </Flex>
    </>
  );
}
