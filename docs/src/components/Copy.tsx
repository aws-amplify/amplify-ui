import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Button } from '@aws-amplify/ui-react';

export const Copy = ({ text, size, variation, className }) => {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={text} onCopy={copy}>
      <Button
        size={size}
        variation={variation}
        isLoading={copied}
        className={className}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </CopyToClipboard>
  );
};
