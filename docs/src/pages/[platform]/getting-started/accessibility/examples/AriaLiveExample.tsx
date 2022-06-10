import { Flex, Button, Badge } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const AriaLiveExample = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <Flex>
      <Button onClick={handleClick}>Add card to list.</Button>
      <Badge aria-live="polite" alignSelf="center">
        {`${count} cards in list`}
      </Badge>
    </Flex>
  );
};
