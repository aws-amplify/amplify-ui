import * as React from 'react';
import { Placeholder, PlaceholderSize, Flex } from '@aws-amplify/ui-react';

import { FieldLabeler } from '../../../../components/FieldLabeler';

export const PlaceholderDemo = () => {
  const [loaded, setLoaded] = React.useState<boolean>();
  const [size, setSize] = React.useState<PlaceholderSize>();

  return (
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
            onChange={(event) => setSize(event.target.value as PlaceholderSize)}
            id="size"
            name="size"
          >
            <option value="small">small</option>
            <option>(default)</option>
            <option value="large">large</option>
          </select>
        </FieldLabeler>
      </Flex>
      <Placeholder isLoaded={loaded} size={size}>
        Demo
      </Placeholder>
    </Flex>
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
