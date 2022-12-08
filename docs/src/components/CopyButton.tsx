import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { trackCopy } from '@/utils/track';

interface CopyButtonProps
  extends Pick<ButtonProps, 'className' | 'size' | 'variation'> {
  copyText: string;
}

export const CopyButton = ({
  className,
  copyText,
  size,
  variation,
}: CopyButtonProps) => {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    trackCopy(copyText);
  };

  return (
    <CopyToClipboard text={copyText} onCopy={copy}>
      <Button
        className={className}
        isDisabled={copied}
        size={size}
        variation={variation}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </CopyToClipboard>
  );
};
