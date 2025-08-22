import React from 'react';
import { getUrl } from '@aws-amplify/storage/internals';

import {
  ActionViewConfig,
  ActionHandler,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

import { managedAuthAdapter } from '../managedAuthAdapter';
import { SignIn, SignOutButton } from './components';
import {
  Button,
  Flex,
  Link,
  StepperField,
  Text,
  View,
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/styles.css';

type GetLink = ActionHandler<
  { duration: number; fileKey: string },
  { link: string }
>;

const getLink: GetLink = ({ data, config }) => {
  const result = getUrl({
    path: data.key,
    options: {
      bucket: { bucketName: config.bucket, region: config.region },
      locationCredentialsProvider: config.credentials,
      expiresIn: data.duration * 60,
      validateObjectExistence: true,
    },
  }).then((res) => ({
    status: 'COMPLETE' as const,
    value: { link: res.url.toString() },
  }));

  return { result };
};

const generateLink: ActionViewConfig<GetLink, 'LinkActionView'> = {
  handler: getLink,
  viewName: 'LinkActionView',
  actionListItem: {
    icon: 'download',
    label: 'Generate Download Links',
    disable: (selected) => !selected?.length,
  },
};

const { StorageBrowser, useAction, useView } = createStorageBrowser({
  actions: { custom: { generateLink } },
  config: managedAuthAdapter,
});

const LinkActionView = () => {
  const [duration, setDuration] = React.useState(60);

  const { onActionExit, fileDataItems } = useView('LocationDetail');

  const items = React.useMemo(
    () =>
      !fileDataItems
        ? []
        : fileDataItems.map((item) => ({ ...item, duration })),
    [fileDataItems, duration]
  );

  const [{ tasks }, handleCreate] = useAction('generateLink', { items });

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
      <Button onClick={() => handleCreate()}>Start</Button>
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

function Example() {
  const [showSignIn, setShowSignIn] = React.useState(false);

  return !showSignIn ? (
    <SignIn onSignIn={() => setShowSignIn(true)} />
  ) : (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      <SignOutButton onSignOut={() => setShowSignIn(false)} />
      <View flex="1" overflow="hidden">
        {/* TODO remove before merge the file-preview feature branch  */}
        {/* @ts-expect-error */}
        <StorageBrowser views={{ LinkActionView }} />
        <StorageBrowser.LocationActionView />
      </View>
    </Flex>
  );
}

export default Example;
