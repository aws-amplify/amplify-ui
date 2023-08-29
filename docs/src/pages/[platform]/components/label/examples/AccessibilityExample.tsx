import { Input, Label } from '@aws-amplify/ui-react';

export const AccessibilityExample = () => (
  <>
    <Label htmlFor="departure">Departure date</Label>
    <Input id="departure" type="date" />
  </>
);
