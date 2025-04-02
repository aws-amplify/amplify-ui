import { LocationData } from '@aws-amplify/ui-react-storage/browser';
import { StorageBrowser } from '../storage-browser';

const location: LocationData = {
  bucket: 'my-bucket',
  id: 'id',
  permissions: ['delete', 'get', 'list', 'write'],
  prefix: 'my-prefix',
  type: 'PREFIX',
};
const handleValueChange = () => null;

export default function App() {
  return (
    <>
      {/* StorageBrowser.Provider: deprecated props */}
      <StorageBrowser.Provider
        actionType="an-action"
        location={location}
        path="a-path"
      />

      {/* StorageBrowser.Provider: conflicting props w/ deprecated props */}
      <StorageBrowser.Provider
        actionType="an-action"
        location={location}
        path="a-path"
        value={{}}
      />

      {/* StorageBrowser.Provider: controlled - missing required param */}
      <StorageBrowser.Provider
        onValueChange={handleValueChange}
        value={{
          location: {
            bucket: 'my-bucket',
            prefix: 'my-prefix',
            // @ts-expect-error validate missing required param
            permissions: undefined,
          },
        }}
      />

      <StorageBrowser.Provider value={{}} />

      {/* StorageBrowser: conflicting controlled/uncontrolled behavior */}
      <StorageBrowser defaultValue={{}} value={{}} />

      {/* StorageBrowser: readonly */}
      <StorageBrowser value={{}} />

      {/* StorageBrowser: controlled - missing required param */}
      <StorageBrowser
        onValueChange={handleValueChange}
        value={{
          location: {
            bucket: 'my-bucket',
            prefix: 'my-prefix',
            // @ts-expect-error validate missing required param
            permissions: undefined,
          },
        }}
      />
    </>
  );
}
