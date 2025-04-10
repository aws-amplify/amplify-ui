import ButtonGroup from '@mui/material/ButtonGroup';

import {
  createStorageBrowser,
  StorageBrowserValue,
} from '@aws-amplify/ui-react-storage/browser';

import { INITIAL_VALUES, MOCK_CSB_INPUT } from '../storage-browser';

import {
  ActionCancel,
  ActionDestination,
  ActionExit,
  ActionStart,
  AddFiles,
  AddFolder,
  Layout,
  Title,
} from './components';

const DEFAULT_VALUE: StorageBrowserValue = {
  location: { ...INITIAL_VALUES.locations![0] },
  actionType: 'upload',
};

const { StorageBrowser, useView } = createStorageBrowser({
  ...MOCK_CSB_INPUT,
  components: {
    ActionCancel,
    ActionDestination,
    ActionExit,
    AddFiles,
    AddFolder,
    ActionStart,
    Title,
  },
});

const { Provider, UploadView } = StorageBrowser;

function MyUploadView() {
  const props = useView('Upload');

  const { isProcessing } = props;

  return (
    <UploadView.Provider {...props}>
      <UploadView.Title />
      <UploadView.Destination />
      <UploadView.Exit />
      <UploadView.Start />
      <UploadView.Cancel />
      <ButtonGroup disabled={isProcessing} variant="contained">
        <UploadView.AddFiles />
        <UploadView.AddFolder />
      </ButtonGroup>
    </UploadView.Provider>
  );
}

export default function App() {
  return (
    <Layout>
      <Provider value={DEFAULT_VALUE}>
        <MyUploadView />
      </Provider>
    </Layout>
  );
}
