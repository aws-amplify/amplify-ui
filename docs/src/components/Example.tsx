import * as React from 'react';

import { View } from '@aws-amplify/ui-react';
import { CopyButton } from './CopyButton';
import { CodesandboxButton } from './IDE/CodesandboxButton';
import { StackBlitzButton } from './IDE/StackBlitzButton';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function Example({ children, className = '' }: ExampleProps) {
  return <View className={`docs-example ${className}`}>{children}</View>;
}

export function ExampleCode({ children, withOnlineIDE }) {
  const [text, setText] = React.useState('');
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    setText(ref.current.innerText);
  }, [children]);

  return (
    <>
      <View className="docs-example__code">
        <div ref={ref}>{children}</div>
      </View>
      <View className="docs-example__actions">
        <CopyButton variation="link" size="small" copyText={text} />
        {withOnlineIDE ? (
          <View className="docs-example__actions__ides">
            Edit in
            <CodesandboxButton variation="link" size="small" code={text} />
            <StackBlitzButton variation="link" size="small" code={text} />
          </View>
        ) : null}
      </View>
    </>
  );
}
