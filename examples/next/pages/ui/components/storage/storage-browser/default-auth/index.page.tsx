import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  Breadcrumbs,
  Button,
  Menu,
  MenuItem,
  withAuthenticator,
} from '@aws-amplify/ui-react';
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
    ActionSelect: ({ actions, handleUpdateState, history }) => {
      return (
        <Menu>
          {actions.map(({ action, variant }) => {
            const { name, type } = action;
            const requiresFileInput =
              type === 'UPLOAD_FILES' || type === 'UPLOAD_FOLDER';
            const destination = history[history.length - 1];

            const handleActionClick = () => {
              if (requiresFileInput) {
                // if (fileUploadRef?.current) {
                //   fileUploadRef.current.click();
                // }
              } else {
                /* TODO: Case for actions that don't need an input */
                handleUpdateState({
                  actionType: type,
                  type: 'SELECT_ACTION_TYPE',
                  destination,
                  name: name,
                  items: [],
                });
              }
            };
            return (
              <MenuItem
                key={name}
                onClick={() => {
                  handleActionClick();
                }}
              >
                {name}
              </MenuItem>
            );
          })}
        </Menu>
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
