import * as React from 'react';
import { Button, Flex, IconSave, View } from '@aws-amplify/ui-react';

export const IconButtonExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <View>
        <Button gap="0.1rem" size="small">
          <IconSave /> Save
        </Button>
        <Button gap="0.2rem">
          <IconSave /> Save
        </Button>
        <Button gap="0.2rem" size="large">
          <IconSave /> Save
        </Button>
      </View>
      <View>
        <Button size="small">
          <IconSave />
        </Button>
        <Button>
          <IconSave />
        </Button>
        <Button size="large">
          <IconSave />
        </Button>
      </View>
    </Flex>
  );
};
