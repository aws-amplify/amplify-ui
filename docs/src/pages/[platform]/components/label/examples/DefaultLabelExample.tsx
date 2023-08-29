import { Input, Label } from '@aws-amplify/ui-react';

export const DefaultLabelExample = () => (
  <>
    <Label htmlFor="first_name">First Name:</Label>
    <Input id="first_name" name="first_name" />
  </>
);
