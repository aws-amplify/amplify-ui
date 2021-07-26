import React, { useState } from 'react';
import {
  Placeholder,
  PlaceholderSize,
  Flex,
  View,
} from '@aws-amplify/ui-react';

import { FieldLabeler } from '../../../../components/FieldLabeler';

export const PlaceholderDemo = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [size, setSize] = useState<PlaceholderSize>('medium');

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
              <option value="small">small</option>
              <option value="medium">medium</option>
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
      {isLoaded ? 'First way' : <Placeholder />}
      <Placeholder isLoaded={isLoaded}>Second Way</Placeholder>
    </Flex>
  );
};
