import React from 'react';
import {
  createStorageBrowser,
  CreateStorageBrowserInput,
} from '@aws-amplify/ui-react-storage/browser';
import { Breadcrumbs, View, Text, Loader } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';
import { defaultActions } from './defaultActions';

const components: CreateStorageBrowserInput['components'] = {
  Navigation: ({ items }) => (
    <Breadcrumbs.Container>
      {items.map(({ isCurrent, name, onNavigate }) => (
        <Breadcrumbs.Item key={name}>
          <Breadcrumbs.Link isCurrent={isCurrent} onClick={onNavigate}>
            🏠 {name}
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs.Container>
  ),

  LoadingIndicator: ({ isLoading }) =>
    isLoading ? (
      <View textAlign="center" padding="large">
        <Loader size="large" />
        <Text>⏳ Loading your files...</Text>
      </View>
    ) : null,

  Title: ({ title }) => (
    <Text fontSize="xl" fontWeight="bold" color="brand.primary.80">
      📁 {title}
    </Text>
  ),
};

const { StorageBrowser } = createStorageBrowser({
  config: mockConfig,
  actions: { default: defaultActions },
  components, // Pass custom components here
});

export default function Example() {
  return <StorageBrowser />;
}
