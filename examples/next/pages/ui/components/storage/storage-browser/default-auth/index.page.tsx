import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { Breadcrumbs, Button, withAuthenticator } from '@aws-amplify/ui-react';
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';
import { elements } from './custom-elements';

Amplify.configure(config);

const { StorageBrowser } = createStorageBrowser({
  elements,
  config: createAmplifyAuthAdapter({
    options: { defaultPrefixes: ['public/', 'private/', 'protected/'] },
  }),
  controls: {
    Navigate: ({ history, handleUpdateState }) => {
      return (
        <Breadcrumbs.Container>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link
              onClick={() => {
                handleUpdateState({ type: 'EXIT' });
              }}
            >
              Home
            </Breadcrumbs.Link>
          </Breadcrumbs.Item>
          {history.map((entry, i) => {
            const isCurrent = i === history.length - 1;
            return (
              <Breadcrumbs.Item key={i}>
                <Breadcrumbs.Link
                  onClick={() => {
                    handleUpdateState({ type: 'NAVIGATE', prefix: entry });
                  }}
                  isCurrent={isCurrent}
                >
                  {entry}
                </Breadcrumbs.Link>
              </Breadcrumbs.Item>
            );
          })}
        </Breadcrumbs.Container>
      );
    },
  },
  // views: {
  //   LocationDetailView: () => {

  //     return <div>hello</div>;
  //   },
  // },
});

function Example() {
  return (
    <>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
      <StorageBrowser />
    </>
  );
}

export default withAuthenticator(Example);
