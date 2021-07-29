import React, { useState } from 'react';
import {
  Placeholder,
  PlaceholderSize,
  Flex,
  View,
} from '@aws-amplify/ui-react';

import { FieldLabeler } from '../../../../components/FieldLabeler';

export const PlaceholderDemo = () => {
  const [loaded, setLoaded] = useState<boolean>();
  const [size, setSize] = useState<PlaceholderSize>();

  return (
    <div>
      <Flex direction="column" gap="1rem">
        <Flex>
          <FieldLabeler id="loaded">
            <input
              id="loaded"
              name="loaded"
              type="checkbox"
              onChange={() => setLoaded(!loaded)}
            />
          </FieldLabeler>

          <FieldLabeler id="size">
            <select
              value={size}
              placeholder="Select placeholder size"
              onChange={(event) =>
                setSize(event.target.value as PlaceholderSize)
              }
              id="size"
              name="size"
            >
              <option>(default)</option>
              <option value="small">small</option>
              <option value="large">large</option>
            </select>
          </FieldLabeler>
        </Flex>
        <View>
          <Placeholder isLoaded={loaded} size={size}>
            Demo
          </Placeholder>
        </View>
      </Flex>
    </div>
  );
};

export const TwoWays = () => {
  let isLoaded = false;
  return (
    <Flex direction="column" gap="1rem">
      <Placeholder isLoaded={isLoaded}>First way</Placeholder>
      {isLoaded ? 'Second way' : <Placeholder />}
    </Flex>
  );
};
