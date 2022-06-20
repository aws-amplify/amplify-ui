import { Grid, Button } from '@aws-amplify/ui-react';

// use any CSS value
export const GridStylePropExample = () => {
  return (
    <Grid templateColumns="100px 100px 100px" gap="1rem">
      <Button column="1/3" row="1">
        A
      </Button>
      <Button column="3" row="1/3">
        B
      </Button>
      <Button column="1" row="2">
        C
      </Button>
      <Button column="2" row="2">
        D
      </Button>
    </Grid>
  );
};
