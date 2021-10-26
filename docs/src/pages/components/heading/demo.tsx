import React, { useState } from 'react';
import { Heading, HeadingLevel, Flex, View } from '@aws-amplify/ui-react';
import { FieldLabeler } from '../../../../components/FieldLabeler';
import { Example } from '../../../../components/Example';

export const HeadingDemo = () => {
  const [level, setLevel] = useState<HeadingLevel>(6);

  return (
    <Flex direction="column" gap="1rem">
      <Flex>
        <FieldLabeler id="level">
          <select
            value={level}
            placeholder="Select heading level"
            onChange={(event) => setLevel(+event.target.value as HeadingLevel)}
            id="level"
            name="level"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </FieldLabeler>
      </Flex>
      <Example>
        <View>
          <Heading level={level}>Heading</Heading>
        </View>
      </Example>
    </Flex>
  );
};
