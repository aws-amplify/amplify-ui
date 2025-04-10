import {
  createStorageBrowser,
  StorageBrowserValue,
} from '@aws-amplify/ui-react-storage/browser';

import { INITIAL_VALUES, MOCK_CSB_INPUT } from '../storage-browser';

import { ActionCancel, ActionExit, ActionStart, Layout } from './components';

const DEFAULT_VALUE: StorageBrowserValue = {
  location: { ...INITIAL_VALUES.locations![0] },
  actionType: 'upload',
};

const { StorageBrowser, useView } = createStorageBrowser({
  ...MOCK_CSB_INPUT,
  components: {
    ActionCancel,
    ActionExit,
    ActionStart,
  },
});

function MyUploadView() {
  const props = useView('Upload');

  return (
    <StorageBrowser.UploadView.Provider {...props}>
      <StorageBrowser.UploadView.Exit />
      <StorageBrowser.UploadView.Start />
      <StorageBrowser.UploadView.Cancel />
    </StorageBrowser.UploadView.Provider>
  );
}

export default function App() {
  return (
    <Layout>
      <StorageBrowser.Provider value={DEFAULT_VALUE}>
        <MyUploadView />
      </StorageBrowser.Provider>
    </Layout>
  );
}
