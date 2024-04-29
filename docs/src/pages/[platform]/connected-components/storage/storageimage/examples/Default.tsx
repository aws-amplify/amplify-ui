import { StorageImage } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return <StorageImage alt="sleepy-cat" path="public/cat.jpg" />;
};

export default App;
