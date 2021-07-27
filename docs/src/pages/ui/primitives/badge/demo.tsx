import React, { useState } from 'react';
import {
  Badge,
  BadgeVariation,
  BadgeSize,
  Flex,
  View,
} from '@aws-amplify/ui-react';

import { FieldLabeler } from '../../../../components/FieldLabeler';

export const BadgeDemo = () => {
  const [variation, setVariation] = useState<BadgeVariation>();
  const [size, setSize] = useState<BadgeSize>();

  return (
    <div>
      <Flex direction="column" gap="1rem">
        <Flex>
          <FieldLabeler id="variation">
            <select
              value={variation}
              placeholder="Select badge variation"
              onChange={(event) =>
                setVariation(event.target.value as BadgeVariation)
              }
              id="variation"
              name="variation"
            >
              <option></option>
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
              onChange={(event) => setSize(event.target.value as BadgeSize)}
              id="size"
              name="size"
            >
              <option></option>
              <option value="small">small</option>
              <option value="large">large</option>
            </select>
          </FieldLabeler>
        </Flex>
        <View>
          <Badge variation={variation} size={size}>
            Badge
          </Badge>
        </View>
      </Flex>
    </div>
  );
};
