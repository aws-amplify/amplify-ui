import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { trackCopy } from '@/utils/track';

interface CopyButtonProps
  extends Pick<ButtonProps, 'className' | 'size' | 'variation'> {
  target: string;
}

export const CopyButton = ({
  className,
  target,
  size = 'small',
  variation = 'link',
  ...rest
}: CopyButtonProps) => {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    trackCopy(target);
  };

  return (
    <CopyToClipboard text={target} onCopy={copy}>
      <Button
        {...rest}
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
