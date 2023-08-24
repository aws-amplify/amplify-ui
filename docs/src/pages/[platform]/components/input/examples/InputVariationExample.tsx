import { Input, Label } from '@aws-amplify/ui-react';

export const InputVariationExample = () => {
  return (
    <>
      <Label htmlFor="Default">Default</Label>
      <Input id="default" />
      <Label htmlFor="Quiet">Default</Label>
      <Input id="quiet" variation="quiet" />
    </>
  );
};
