import React from 'react';
import { Badge, Flex } from '@aws-amplify/ui-react';

import { BadgePropControls } from '@/components/BadgePropControls';
import { useBadgeProps } from '@/components/useBadgeProps';
import { Example } from '@/components/Example';

export const BadgeDemo = () => {
  const badgeProps = useBadgeProps({});

  return (
    <Flex direction="column" gap="0.5rem">
      <BadgePropControls {...badgeProps} />
      <Example>
        <Badge size={badgeProps.size} variation={badgeProps.variation}>
          Badge
        </Badge>
      </Example>
    </Flex>
  );
};
