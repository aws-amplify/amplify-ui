import React, { useState } from 'react';
import {
  Badge,
  BadgeVariant,
  BadgeSize,
  Flex,
  View,
} from '@aws-amplify/ui-react';

import { FieldLabeler } from '../../../../components/FieldLabeler';

export const BadgeDemo = () => {
  const [variant, setVariant] = useState<BadgeVariant>('default');
  const [size, setSize] = useState<BadgeSize>('medium');

  return (
    <div>
      <Flex direction="column" gap="1rem">
        <Flex>
          <FieldLabeler id="variant">
            <select
              value={variant}
              placeholder="Select badge variant"
              onChange={event => setVariant(event.target.value as BadgeVariant)}
              id="variant"
              name="variant"
            >
              <option value="default">default</option>
              <option value="info">info</option>
              <option value="error">error</option>
              <option value="warning">warning</option>
              <option value="success">success</option>
            </select>
          </FieldLabeler>

          <FieldLabeler id="size">
            <select
              value={size}
              placeholder="Select badge size"
              onChange={event => setSize(event.target.value as BadgeSize)}
              id="size"
              name="size"
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </FieldLabeler>
        </Flex>
        <View>
          <Badge variant={variant} size={size}>
            Badge
          </Badge>
        </View>
      </Flex>
    </div>
  );
};
