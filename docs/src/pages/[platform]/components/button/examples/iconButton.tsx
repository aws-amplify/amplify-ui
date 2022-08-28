import * as React from 'react';
import { Button, Flex, Icon, View } from '@aws-amplify/ui-react';

const IconSave = () => {
  return (
    <Icon
      ariaLabel=""
      pathData="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM19 19H5V5H16.17L19 7.83V19ZM12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM6 6H15V10H6V6Z"
    />
  );
};

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
