import { Button, Icon, Text } from '@aws-amplify/ui-react';

const SaveIcon = () => (
  <Icon
    ariaLabel=""
    pathData="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
  />
);

export const IconSizesExample = () => {
  return (
    <>
      {/* Inherited from button sizes */}
      <Button gap="0.1rem" size="small">
        <SaveIcon /> {'Save'}
      </Button>
      <Button gap="0.2rem">
        <SaveIcon /> {'Save'}
      </Button>
      <Button gap="0.2rem" size="large">
        <SaveIcon /> {'Save'}
      </Button>
      <Text as="span" fontSize="50px">
        <SaveIcon />
        Save
      </Text>
    </>
  );
};
