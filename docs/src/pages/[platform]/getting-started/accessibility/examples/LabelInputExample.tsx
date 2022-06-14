import { Grid, TextField } from '@aws-amplify/ui-react';

export const LabelInputExample = () => (
  <Grid
    gap="var(--amplify-space-large)"
    templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
  >
    <TextField label="Example text field" />
    <TextField
      label="Example text field (with custom ID)"
      id="custom-input-id"
    />
  </Grid>
);
