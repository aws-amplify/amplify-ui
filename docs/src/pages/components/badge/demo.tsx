import * as React from 'react';
import { Badge } from '@aws-amplify/ui-react';

import { BadgePropControls } from './BadgePropControls';
import { useBadgeProps } from './useBadgeProps';
import { Demo } from '@/components/Demo';

const propsToCode = (badgeProps) => {
  return (
    `<Badge` +
    (badgeProps.size ? `\n  size=${JSON.stringify(badgeProps.size)}` : '') +
    (badgeProps.variation
      ? `\n  variation=${JSON.stringify(badgeProps.variation)}`
      : '') +
    `>
  ${badgeProps.body}
</Badge>`
  );
};

export const BadgeDemo = () => {
  const badgeProps = useBadgeProps({
    body: 'Badge',
  });

  return (
    <Demo
      code={propsToCode(badgeProps)}
      propControls={<BadgePropControls {...badgeProps} />}
    >
      <Badge size={badgeProps.size} variation={badgeProps.variation}>
        {badgeProps.body}
      </Badge>
    </Demo>
  );
};
