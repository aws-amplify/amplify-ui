import * as React from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { FiChevronRight } from 'react-icons/fi';
import { StorageBrowser, useView } from './MockStorageBrowser';

export function CustomLocationsView() {
  const state = useView('Locations');

  return (
    <Flex direction="column" padding="medium">
      <Text fontWeight="bold">Locations</Text>
      {state.pageItems.map((location) => {
        return (
          <Button
            key={location.id}
            justifyContent="flex-start"
            onClick={() => {
              state.onNavigate(location);
            }}
          >
            <Text flex="1">
              s3://{location.bucket}/{location.prefix}
            </Text>
            <Text as="span" color="font.tertiary" fontWeight="normal">
              {location.permissions.includes('list') ? 'Read' : null}{' '}
              {location.permissions.includes('write') ? 'Write' : null}
            </Text>
            <FiChevronRight color="font.tertiary" />
          </Button>
        );
      })}
    </Flex>
  );
}
