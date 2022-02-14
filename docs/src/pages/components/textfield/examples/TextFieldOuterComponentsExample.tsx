import { Button, Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldOuterComponentsExample = () => (
  <Flex gap="1rem" direction="column">
    <TextField label="Start" outerStartComponent={<Button>Start</Button>} />
    <TextField
      label="Start and End"
      outerStartComponent={<Button>Start</Button>}
      outerEndComponent={<Button>End</Button>}
    />
    <TextField label="End" outerEndComponent={<Button>End</Button>} />
    <TextField
      label="Multiple End"
      outerEndComponent={
        <>
          <Button>End</Button>
          <Button>End</Button>
        </>
      }
    />
    <TextField
      label="Multiple Start"
      outerStartComponent={
        <>
          <Button>Start</Button>
          <Button>Start</Button>
        </>
      }
    />
  </Flex>
);
