import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Checkbox, Flex, Link, Text } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function LocationDetailView() {
  const state = useView('LocationDetail');

  return (
    <>
      {state.pageItems.map((item) => {
        return (
          <Flex key={item.id}>
            {item.type === 'FILE' ? (
              <>
                <Checkbox
                  label={`select ${item.key}`}
                  labelHidden
                  name={item.key}
                  onChange={(e) => {
                    state.onSelect(e.target.checked, item);
                  }}
                />
                <Text>{item.key}</Text>
              </>
            ) : (
              <Button
                variation="link"
                onClick={() => {
                  state.onNavigate(state.location.current, item.key);
                }}
              >
                {item.key}
              </Button>
            )}
          </Flex>
        );
      })}
    </>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <LocationDetailView />
    </StorageBrowser.Provider>
  );
}
