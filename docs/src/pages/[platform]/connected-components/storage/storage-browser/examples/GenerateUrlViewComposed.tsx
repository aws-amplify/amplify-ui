import React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex, Link, StepperField, Text } from '@aws-amplify/ui-react';
import { generateUrlHandler } from './generateUrlHandler';
import { mockConfig } from './mockConfig'; // IGNORE
import { defaultActions } from './defaultActions'; // IGNORE

const { StorageBrowser, useAction, useView } = createStorageBrowser({
  actions: {
    default: defaultActions, // IGNORE
    custom: {
      generateUrl: {
        actionListItem: {
          icon: 'download',
          label: 'Generate Download Links',
          disable: (selected) => !selected?.length,
        },
        handler: generateUrlHandler,
        viewName: 'GenerateUrlView',
      },
    },
  },
  config: mockConfig, // IGNORE
});

const GenerateUrlView = () => {
  const [duration, setDuration] = React.useState(60);

  const { onActionExit, fileDataItems } = useView('LocationDetail');

  const items = React.useMemo(
    () =>
      !fileDataItems
        ? []
        : fileDataItems.map((item) => ({ ...item, duration })),
    [fileDataItems, duration]
  );

  const useActionReturn = useAction(
    // Name of the action.
    'generateUrl',
    // List of action inputs.
    { items }
  );

  const [
    // Execution status and result of each task. The status includes  'CANCELED', 'FAILED', 'COMPLETE', 'OVERWRITE_PREVENTED', 'QUEUED', 'PENDING'.
    { tasks },
    // Start executing the action against the provided `items`.
    handleGenerate,
  ] = useActionReturn;
  useActionReturn[1]();

  tasks[0].error;

  return (
    <Flex direction="column">
      <Button onClick={onActionExit}>Exit</Button>
      <StepperField
        label="Duration"
        step={15}
        value={duration}
        min={15}
        max={300}
        onStepChange={setDuration}
      />
      <Button onClick={() => handleGenerate()}>Start</Button>
      {!tasks
        ? null
        : tasks.map(({ data, status, value }) => {
            return (
              <Flex direction="row" key={data.fileKey}>
                <Text>{data.fileKey}</Text>
                {value?.link ? <Link href={value.link}>link</Link> : null}
                <Text>{status}</Text>
              </Flex>
            );
          })}
    </Flex>
  );
};

export default function Example() {
  return <StorageBrowser views={{ GenerateUrlView }} />;
}
