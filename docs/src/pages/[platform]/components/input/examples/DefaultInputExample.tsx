import { Input, Label } from '@aws-amplify/ui-react';

export const DefaultInputExample = () => (
  <>
    <Label htmlFor="first_name">First Name:</Label>
    <Input id="first_name" name="first_name" />
  </>
);
