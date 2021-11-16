import { Button, IconSave, Text } from '@aws-amplify/ui-react';

export const IconSizesExample = () => {
  return (
    <>
      {/* Inherited from button sizes */}
      <Button gap="0.1rem" size="small">
        <IconSave /> {'Save'}
      </Button>
      <Button gap="0.2rem">
        <IconSave /> {'Save'}
      </Button>
      <Button gap="0.2rem" size="large">
        <IconSave /> {'Save'}
      </Button>
      <Text as="span" fontSize="50px">
        <IconSave />
        Save
      </Text>
    </>
  );
};
