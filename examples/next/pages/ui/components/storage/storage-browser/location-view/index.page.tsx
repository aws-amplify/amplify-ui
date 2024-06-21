import { createStorageBrowser } from '@aws-amplify/ui-react-storage';

const { StorageBrowser } = createStorageBrowser();

export default function Example() {
  return <StorageBrowser.LocationView />;
}
